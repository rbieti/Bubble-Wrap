import firebase from 'firebase';
import {
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS,
  LOAD_EDIT_ITEM,
  EDIT_ITEM,
  FETCH_ALL_ITEMS,
  FETCH_OFFERS,
  GET_USER_ITEMS,
  GET_OFFER_ITEMS
} from './types';
import { IMAGE_UPLOAD_CLOUD_FUNCTION_URL } from '../constants';

export const itemUpdate = ({ prop, value }) => ({
  type: ITEM_UPDATE,
  payload: { prop, value }
});

const uploadImagesToItem = ({ imageURIs, key }, callback) => {
  const images = [];
  let counter = 0;
  const newImages = imageURIs.filter(({ uri }) => uri);
  newImages.forEach(async ({ uri, index }) => {
    const filename = `${key}_${index}.jpg`;
    const body = new FormData();
    body.append('picture', { uri, name: filename, type: 'image/jpg' });
    await fetch(IMAGE_UPLOAD_CLOUD_FUNCTION_URL, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
    });
    const storageRef = firebase.storage().ref(filename);
    storageRef.getDownloadURL().then(url => {
      images.push({ url, index });
      counter++;
      if (counter === newImages.length) {
        callback(images);
      }
    });
  });
};

export const itemCreate = ({ name, description, price, imageURIs }) => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const item = { name, description, price, owner: uid };
  firebase.database().ref('/items').push(item)
    .then((itemRef) => {
      const key = itemRef.key;
      uploadImagesToItem({ imageURIs, key }, images => {
        itemRef.update({ images })
          .then(() => {
            dispatch({
              type: ITEM_CREATE,
              payload: { ...item, images, key }
            });
          });
      });
    });
};

export const fetchItems = () => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref('/items')
    .on('value', snapshot => {
      const items = [];
      snapshot.forEach(item => {
        const { owner, images } = item.val();
        if (images && owner === uid) {
          const imageArray = Object.values(images).sort((a, b) => (a.index > b.index ? 1 : -1));
          items.push({ ...item.val(), images: imageArray, key: item.key });
        }
      });
      dispatch({
        type: FETCH_USER_ITEMS,
        payload: { items }
      });
    });
};

export const loadItem = (item) => ({
  type: LOAD_EDIT_ITEM,
  payload: { item }
});

export const editItem = (item) => dispatch => {
  const { name, description, price, imageURIs, key } = item;
  const itemRef = firebase.database().ref(`/items/${key}`);
  if (imageURIs.some(({ uri }) => uri)) { // has images to update
    uploadImagesToItem({ imageURIs, key }, uploadedImages => {
      const images = imageURIs.slice();
      uploadedImages.forEach(({ url, index }) => (images[index] = { url, index }));
      itemRef.update({ name, description, price, images })
        .then(() => {
          dispatch({
            type: EDIT_ITEM,
            payload: { ...item, images }
          });
        });
    });
  } else { // no images to update
    itemRef.update({ name, description, price })
      .then(() => {
        dispatch({
          type: EDIT_ITEM,
          payload: { item }
        });
      });
  }
};

export const fetchAllItems = () => dispatch => {
  // const { uid } = firebase.auth().currentUser;
  firebase.database().ref('/items')
    .on('value', snapshot => {
      const all_items = [];
      snapshot.forEach(item => {
        const { images } = item.val();
        if (images) {
          const imageArray = Object.values(images).sort((a, b) => (a.index > b.index ? 1 : -1));
          all_items.push({ ...item.val(), images: imageArray, key: item.key });
        }
      });
      dispatch({
        type: FETCH_ALL_ITEMS,
        payload: { all_items }
      });
    });
};

// this will fetch offers
export const fetchOffers = ({ itemId }) => dispatch => {
  // get item's offerIds
  firebase.database().ref(`/items/${itemId}/offers`)
    .on('value', snapshot => {
      if (!snapshot.val()) { // no offers, break
        dispatch({
          type: FETCH_OFFERS,
          payload: { offers: [] }
        });
        return;
      }
      const offerIds = Object.keys(snapshot.val());
      // return the offers
      const offers = [];
      offerIds.forEach(offerId => {
        firebase.database().ref(`/offers/${offerId}`)
          .on('value', snapshot => {
            offers.push({ ...snapshot.val(), key: snapshot.key });
            if (offerIds.length === offers.length) {
              dispatch({
                type: FETCH_OFFERS,
                payload: { offers }
              });
            }
          });
      });
    });
};

// database needs to have users/{userId}/items/{foreignItemIds}
export const getUserItems = () => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref(`users/${uid}/items`)
    .on('value', snapshot => {
      const itemIds = Object.keys(snapshot.val());
      const userItems = [];
      itemIds.forEach(itemId => {
        firebase.database().ref(`items/${itemId}`)
          .on('value', itemSnap => { // = item
            const imagesArray = Object.values(itemSnap.val().images); // convert images object to array
            userItems.push({ ...itemSnap.val(), images: imagesArray, key: itemSnap.key });
            if (itemIds.length === userItems.length) {
              dispatch({
                type: GET_USER_ITEMS,
                payload: { userItems }
              });
            }
          });
      });
    });
};

// gets offerItems from users/{userId}/offers/{foreignOfferIds}
export const getOfferItems = () => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref(`users/${uid}/offers`)
    .on('value', snapshot => {
      const offerIds = Object.keys(snapshot.val()); // this works (getting all keys)
      const offerItems = [];
      offerIds.forEach(offerId => {
        firebase.database().ref(`offers/${offerId}`)
          .on('value', offerSnap => { // = single offer
            const itemId = offerSnap.val().item; // bad database naming (offer.item should be offer.itemId)
            const userOffer = offerSnap.val().amount;
            firebase.database().ref(`items/${itemId}`)
              .on('value', itemSnap => { // = item
                const imagesArray = Object.values(itemSnap.val().images); // convert images object to array
                offerItems.push({ ...itemSnap.val(), images: imagesArray, key: itemSnap.key, userOffer }); // push item and user's offer
                /* !!! MAJOR ASSUMPTION !!! you can only make 1 offer per item !!! */
                if (offerIds.length === offerItems.length) {
                  dispatch({
                    type: GET_OFFER_ITEMS,
                    payload: { offerItems }
                  });
                }
              });
          });
      });
    });
};
