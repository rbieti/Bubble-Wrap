import firebase from 'firebase';
import {
  FETCH_USERS
} from './types';

export const fetchUsers = () => dispatch => {
  firebase.database().ref('/users')
    .on('value', snapshot => {
      const users = {};
      snapshot.forEach(user => {
        users[user.key] = user.val().name;
      });
      dispatch({
        type: FETCH_USERS,
        payload: { users }
      });
    });
};
