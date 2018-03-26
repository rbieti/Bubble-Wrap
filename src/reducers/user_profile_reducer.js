import {
FETCH_USER,
USER_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    user: {},
    name: '',
    overallRating: 0,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, name: action.payload.name};
        default:
            return state;
    }
}