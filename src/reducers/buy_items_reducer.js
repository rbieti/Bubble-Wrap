import {
  LOAD_ITEM,
  FETCH_ITEMS,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {
    key: '',
    name: '',
    description: '',
    price: '',
    images: []
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ITEM:
      return { ...state, item: action.payload.item };
    case FETCH_ITEMS:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
}
