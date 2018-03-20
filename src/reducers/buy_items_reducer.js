import {
  FETCH_ITEM,
  FETCH_ITEMS_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  items: ['', '', '', ''],
  name: '',
  description: '',
  price: '',
  key: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ITEM:
      const { name, description, price, key } = action.payload;  
      return { ...state, name, description, price, key };
    case FETCH_ITEMS_LIST:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
}
