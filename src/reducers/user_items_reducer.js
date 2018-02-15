import firebase from 'firebase';
//import {} from '../actions/types';

// START Testing getting items
export default () => {
  const { currentUser } = firebase.auth();
  const recentPostsRef = firebase.database().ref(`/users/${currentUser.uid}/items`);
  recentPostsRef.once('value').then(snapshot => {
      return snapshot.val();
  });
};
// END Testing

// const INITIAL_STATE = {

// };

// export default function (state = INITIAL_STATE, action) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }
