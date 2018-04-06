import firebase from 'firebase';
import {
  LOAD_ITEM,
  FETCH_ITEMS
} from './types';

// Load currently selected item for BuyItemScreen
export const loadItem = (item) => ({
  type: LOAD_ITEM,
  payload: { item }
});

// Fetch items by passing in a user id
export const fetchItems = ({ uid }) => dispatch => {
  firebase.database().ref('/items') // NOT SCALABLE //
    .on('value', snapshot => {
      const items = [];
      snapshot.forEach(item => {
        const { owner, images } = item.val();
        if (owner === uid) {
          const imageArray = Object.values(images).sort((a, b) => (a.index > b.index ? 1 : -1)); // sort by index
          items.push({ ...item.val(), images: imageArray, key: item.key });
        }
      });
      dispatch({
        type: FETCH_ITEMS,
        payload: { items }
      });
    });
};
