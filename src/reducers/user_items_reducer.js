import { 
  ITEM_UPDATE,
  FETCH_USER_ITEMS_LIST
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  name: '',
  description: '',
  price: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ITEM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case FETCH_USER_ITEMS_LIST:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
}
