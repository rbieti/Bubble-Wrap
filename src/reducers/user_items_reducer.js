import { FETCH_USER_ITEMS_LIST } from '../actions/types';

const INITIAL_STATE = {
  items: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER_ITEMS_LIST:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
}
