import {
    FETCH_USER,
    //USER_UPDATE
    LOAD_UID,
    FETCH_USER_REVIEWS,
    FIND_USER_NAME,
    LOAD_SELLER,
    FETCH_USERS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    overallRating: 0,
    bubbleCommunity: '',
    numTransactions: 0,
    profileURL: 'https://www.aisd.net/adams-elementary/wp-content/files/sites/44/2017/07/generic-profile-picture.png',
    userId: '',
    reviews: [],
    username: '',
    reviewsFetched: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                name: action.payload.name,
                overallRating: action.payload.overallRating,
                bubbleCommunity: action.payload.bubbleCommunity,
                numTransactions: action.payload.numTransactions,
                profileURL: action.payload.profileURL,
                email: action.payload.email
            }
        case FETCH_USERS:
            const reviews = state.reviews.slice(); //copy
            const newReviews = reviews.map((review) => {
                // find user.key with reviewerId
                const user = action.payload.users.find(user => user.key === review.reviewerId);
                return { ...review, name: user.name, profileURL: user.profileURL }; //THIS IS NOT THE FINAL RETURN
            });
            return {
                ...state,
                reviews: newReviews
            };
        case FETCH_USER_REVIEWS:
            console.log(action.payload.reviewsArray);
            return {
                ...state,
                reviews: action.payload.reviewsArray,
                reviewsFetched: true
            }
        case FIND_USER_NAME:
            return {
                ...state,
                username: action.payload.username
            }
        case LOAD_SELLER:
            console.log("returning new guy");
            return {
                ...state,
                name: action.payload.name,
                overallRating: action.payload.overallRating,
                bubbleCommunity: action.payload.bubbleCommunity,
                numTransactions: action.payload.numTransactions,
                profileURL: action.payload.profileURL,
                email: action.payload.email,
                userId: action.payload.userId,
                reviewsFetched: false
            }
        default:
            return state;
    }
}