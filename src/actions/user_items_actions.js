import firebase from 'firebase';
import {
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS_LIST
} from './types';

export const itemUpdate = ({ prop, value }) => ({
    type: ITEM_UPDATE,
    payload: { prop, value }
  });

export const itemCreate = ({ name, description, price, images }) => {
  // console.log(name, description, price); // comment this
  const { currentUser } = firebase.auth();

  const newRef = firebase.database().ref(`/users/${currentUser.uid}/items`)
    .push({ name, description, price });

  const key = newRef.key;

  images.forEach(async (uri, i) => {
    const filename = `${key}_${i}.jpg`;
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
    console.log(`${uri} was successfully uploaded!`);
    // firebase.storage.ref(filename).getDownloadURL().then();
    //await firebase.storage.ref(filename).then((url) => console.log(url));
  });
  return {
    type: ITEM_CREATE,
    payload: 'success'
  };
};

export const fetchItems = () => dispatch => {
    const { currentUser } = firebase.auth();
    const recentPostsRef = firebase.database().ref(`/users/${currentUser.uid}/items`);

    //recentPostsRef.once('value').then(snapshot => {
    recentPostsRef.on('value', snapshot => {
      //items = Object.values(snapshot.val());
      const items = [];
      snapshot.forEach(item => {
        items.push({ ...item.val(), key: item.key });
      });
      dispatch({
        type: FETCH_USER_ITEMS_LIST,
        payload: { items }
      });
    });
  };
