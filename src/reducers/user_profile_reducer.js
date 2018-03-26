import {
FETCH_USER,
USER_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    overallRating: 0,
    bubbleCommunity: '',
    numTransactions: 0,
    profileURL: ''
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
        default:
            return state;
    }
}