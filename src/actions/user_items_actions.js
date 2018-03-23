import firebase from 'firebase';
import {
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS
} from './types';

export const itemUpdate = ({ prop, value }) => ({
  type: ITEM_UPDATE,
  payload: { prop, value }
});

export const itemCreate = ({ name, description, price, images }) => dispatch => {
  // Push item details
  const owner = firebase.auth().currentUser.uid;
  const itemRef = firebase.database().ref('/items')
    .push({ name, description, price, owner });
  const key = itemRef.key;

  // Upload images
  const imagesObj = {};
  let item = {};
  let counter = 0;
  const imgs = images.filter(String); // filter out empty Strings
  imgs.forEach(async (uri, index) => {
    const filename = `${key}_${index}.jpg`; // eg: abc123itemkey_3.jpg
    const body = new FormData();
    body.append('picture', {
      uri,
      name: filename,
      type: 'image/jpg'
    });
    await fetch('https://us-central1-bubble-wrap-8485d.cloudfunctions.net/api/picture', {
      method: 'POST',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    });

    // Push image urls to item
    const storageRef = firebase.storage().ref(filename);
    storageRef.getDownloadURL().then(url => {
      firebase.database().ref(`/items/${key}/images`)
        .push({ url, index })
        .then(() => {
          imagesObj[index] = { url, index };
          counter++;
          if (counter === imgs.length) {
            // dispatch the item
            const imageArray = Object.values(imagesObj).sort((a, b) => (a.index > b.index ? 1 : -1));
            item = { name, description, price, owner, key, images: imageArray };
            dispatch({
              type: ITEM_CREATE,
              payload: { item }
            });
          }
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
        if (owner === uid) {
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
