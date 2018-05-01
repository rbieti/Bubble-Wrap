import firebase from 'firebase';
import {
  FETCH_USERS
} from './types';
//this file and all related files need to be deleted
export const fetchUsers = ({ userKeys }) => dispatch => {
  const users = [];
  userKeys.forEach(userKey => {
    firebase.database().ref(`/users/${userKey}`)
      .on('value', snapshot => {
        const { 
          bubbleCommunity, 
          email, 
          name, 
          numTransactions, 
          overallRating, 
          profileURL, 
          reviews } = snapshot.val();

        users.push({
          bubbleCommunity,
          email,
          name,
          numTransactions,
          overallRating,
          profileURL,
          reviews,
          key: userKey
        })
        if (userKeys.length === users.length)
          dispatch({
            type: FETCH_USERS,
            payload: { users }
          });
      });
  });
};
