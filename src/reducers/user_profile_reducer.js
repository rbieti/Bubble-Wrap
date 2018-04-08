import {
FETCH_USER,
//USER_UPDATE
LOAD_UID,
FETCH_USER_REVIEWS,
FIND_USER_NAME
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    overallRating: 0,
    bubbleCommunity: '',
    numTransactions: 0,
    profileURL: 'https://www.aisd.net/adams-elementary/wp-content/files/sites/44/2017/07/generic-profile-picture.png',
    userID: '',
    reviews: [],
    username: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, 
                name: action.payload.name, 
                overallRating: action.payload.overallRating,
                bubbleCommunity: action.payload.bubbleCommunity,
                numTransactions: action.payload.numTransactions,
                profileURL: action.payload.profileURL
            };
        case LOAD_UID:
            return {
                ...state,
                userID: action.payload.userID
            }
        case FETCH_USER_REVIEWS:
            return {
                ...state,
                reviews: action.payload.reviewsArray
            }
        case FIND_USER_NAME:
            return {
                ...state,
                username: action.payload.username
            }
        default:
            return state;
    }
}