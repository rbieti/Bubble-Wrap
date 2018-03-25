import firebase from 'firebase';
import {
    USER_UPDATE,
    FETCH_USER
} from './types';

export const fetchUser = () => dispatch => {
    const { uid } = firebase.auth().currentUser;
    const names = "REEEEEEEEEEEEEE";
    firebase.database().ref('/users')
    .on('value', snapshot => {
        const review = [];
            snapshot.forEach(user => {
                const { name, overallRating, reviews } = user.val();
                const reviewsArray = Object.values(reviews);
                review.push({ ...user.val(), reviews: reviewsArray, key: user.key });
                
            });
        });
        dispatch({
            type: FETCH_USER,
            payload: { names }
        });
};