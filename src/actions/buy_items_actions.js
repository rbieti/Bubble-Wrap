import firebase from 'firebase';
import {
  FETCH_ITEM,
  FETCH_ITEMS_LIST
} from './types';

// Fetch a specific item
export const fetchItem = ({ name, description, price }) => ({
  type: FETCH_ITEM,
  payload: { name, description, price }
});

// TR: This is where we'd actually grab other people's items 
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
      type: FETCH_ITEMS_LIST,
      payload: { items }
    });
  });
};
