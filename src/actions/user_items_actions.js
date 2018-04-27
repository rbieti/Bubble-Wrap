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
  const newImages = imageURIs.filter(({ uri }) => uri); // potentially could just use (uri vs url) this for checking whether it's edited?
  newImages.forEach(async ({ uri, index }) => {
    const filename = `${key}_${index}.jpg`;
    const body = new FormData();
    body.append('picture', { uri, name: filename, type: 'image/jpg' });
    await fetch(IMAGE_UPLOAD_CLOUD_FUNCTION_URL, {
      method: 'POST',
      body,
      headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }
    }).catch(error => console.log(error));
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
  if (imageURIs.length > 0) { // has images to update
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

export const fetchOffers = (prevItems) => dispatch => {
  const itemKeys = prevItems.map((item => item.key));
  firebase.database().ref('/offers')
    .on('value', snapshot => {
      const items = prevItems.slice(); // copy
      snapshot.forEach(o => {
        const offer = o.val();
        const itemKey = offer.item; // item is the itemKey
        if (itemKeys.includes(itemKey)) {
          const item = items.find(i => i.key === itemKey);
          if (!('offers' in item)) {
            item.offers = []; // create offers array if it doesn't exist
          }
          item.offers.push({ ...offer, key: o.key });
        }
      });
      dispatch({
        type: FETCH_OFFERS,
        payload: { items }
      });
    });
};

export const getUserItems = (items) => {
  const { uid } = firebase.auth().currentUser;
  const userItems = [];
  items.forEach(item => {
    if (item.owner === uid) {
      userItems.push(item);
    }
  });
  return {
    type: GET_USER_ITEMS,
    payload: { userItems }
  };
};

export const getOfferItems = (items) => {
  const { uid } = firebase.auth().currentUser;
  const offerItems = items.filter(({ offers }) => offers && offers.some(({ user }) => user === uid))
    .map(item => {
      return { ...item, offers: item.offers.filter(({ user }) => user === uid) };
    });
  return {
    type: GET_OFFER_ITEMS,
    payload: { offerItems }
  };
};
