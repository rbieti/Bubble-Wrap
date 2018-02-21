import firebase from 'firebase';
import { FETCH_USER_ITEMS_LIST } from './types';

export const fetchItems = () => {
  return dispatch => {
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
};
