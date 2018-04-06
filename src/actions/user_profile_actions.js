import firebase from 'firebase';
import {
    USER_UPDATE,
    FETCH_USER,
    LOAD_UID,
    FETCH_USER_REVIEWS
} from './types';

export const fetchUser = () => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref(`/users/${uid}`)
  .on('value', snapshot => {
    const review = [];
      const { name, bubbleCommunity, numTransactions, overallRating, profileURL } = snapshot.val()
      // const { name, overallRating, reviews } = user.val();
      // const reviewsArray = Object.values(reviews);
      // review.push({ ...user.val(), reviews: reviewsArray, key: user.key });
      dispatch({
        type: FETCH_USER,
        payload: { name, bubbleCommunity, numTransactions, overallRating, profileURL }
      });
  });
};

export const fetchUserReviews = () => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref(`/users/${uid}/reviews`)
  .on('value', snapshot => {
    const reviewsArray = [];
    snapshot.forEach(review => {
      const { comment, rating, userId } = review.val();
      reviewsArray.push({ ...review.val(), 
        comment: comment, 
        rating: rating, 
        userId: userId, 
        key: review.key });
    });
    dispatch({
      type: FETCH_USER_REVIEWS,
      payload: { reviewsArray }
    })
  });
};

export const loadUID = (userID) => {
  return {
    type: LOAD_UID,
    payload: { userID }
  }
};
