import firebase from 'firebase';
import {
    USER_UPDATE,
    FETCH_USER,
    FETCH_USER_REVIEWS,
    LOAD_SELLER
} from './types';

export const loadSeller = (sellerID) => dispatch => {
  firebase.database().ref(`/users`)
  .on('value', snapshot => {
    let seller = {};
    snapshot.forEach(user => {
      if (user.key === sellerID)
        seller = user;
    });
    dispatch ({
      type: LOAD_SELLER,
      payload: { seller }
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
