import firebase from 'firebase';
import { 
  ITEM_UPDATE, 
  FETCH_USER_ITEMS_LIST 
} from './types';

export const itemUpdate = ({ prop, value }) => {
  return {
    type: ITEM_UPDATE,
    payload: { prop, value }
  };
};

export const itemCreate = ({ name, description, price}) => {
  // console.log(name, description, price); // comment this
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/items`)
    .push({ name, description, price});
};

export const fetchItems = () => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    const recentPostsRef = firebase.database().ref(`/users/${currentUser.uid}/items`); //this needs to be edited so it pulls items correctly - the updated  way we're storing items
    
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
