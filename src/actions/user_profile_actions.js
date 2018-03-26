import firebase from 'firebase';
import {
    USER_UPDATE,
    FETCH_USER
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