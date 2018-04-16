import { 
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS,
  FETCH_ALL_ITEMS
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  all_items: [],
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
    case FETCH_ALL_ITEMS:
      return { ...state, all_items: action.payload.all_items };
    default:
      return state;
  }
}
