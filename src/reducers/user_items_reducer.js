import {
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS,
  LOAD_EDIT_ITEM,
  EDIT_ITEM
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {},
  name: '',
  description: '',
  price: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ITEM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ITEM_CREATE:
      return { ...state, item: action.payload.item };
    case FETCH_USER_ITEMS:
      return { ...state, items: action.payload.items };
    case LOAD_EDIT_ITEM:
      return { ...state, item: action.payload.item };
    case EDIT_ITEM:
      return { ...state, item: action.payload.item };
    default:
      return state;
  }
}
