import firebase from 'firebase';
import {
  USER_UPDATE,
  FETCH_USER,
  FETCH_USER_REVIEWS,
  LOAD_SELLER,
  FETCH_USERS
} from './types';

export const loadSeller = (sellerID) => dispatch => {
  firebase.database().ref(`/users/${sellerID}`)
    .on('value', snapshot => {
      dispatch({
        type: LOAD_SELLER,
        payload: { ...snapshot.val(), userId: snapshot.key }
      });
    });
};

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


export const fetchUser = () => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref(`/users/${uid}`)
    .on('value', snapshot => {
      const review = [];
      const { name, bubbleCommunity, numTransactions, overallRating, profileURL, email } = snapshot.val()
      // const { name, overallRating, reviews } = user.val();
      // const reviewsArray = Object.values(reviews);
      // review.push({ ...user.val(), reviews: reviewsArray, key: user.key });
      dispatch({
        type: FETCH_USER,
        payload: { name, bubbleCommunity, numTransactions, overallRating, profileURL, email }
      });
    });
};

export const fetchUserReviews = (uid = firebase.auth().currentUser.uid) => dispatch => {
  //get the review keys of the current user
  console.log(uid);
  firebase.database().ref(`/users/${uid}/reviews`)
    .on('value', snapshot => {
      const userReviews = [];
      //iterate through each of the user's review keys and add to array
      snapshot.forEach(review => {
        userReviews.push(review.key);
      });
      const reviewsArray = [];
      console.log(userReviews);
      //iterate through each review key to get each review
      userReviews.forEach(reviewKey => {
        firebase.database().ref(`/reviews/${reviewKey}`)
          .on('value', snapshot => {
            //add each review to an array and dispatch it
            const { comment, rating, userId, reviewerId } = snapshot.val();
            reviewsArray.push({
              comment,
              rating,
              reviewerId,
              userId,
              key: reviewKey
            });
            if (reviewsArray.length === userReviews.length) {
              dispatch({
                type: FETCH_USER_REVIEWS,
                payload: { reviewsArray }
              });
            }
          });
      });
    });
};
