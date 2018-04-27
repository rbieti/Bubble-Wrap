import {
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS,
  LOAD_EDIT_ITEM,
  EDIT_ITEM,
  FETCH_ALL_ITEMS,
  FETCH_OFFERS,
  GET_USER_ITEMS,
  GET_OFFER_ITEMS
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  userItems: [],
  offerItems: [],
  all_items: [],
  item: {},
  name: '',
  description: '',
  price: '',
  offersFetched: false
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
    case FETCH_ALL_ITEMS:
      return { ...state, all_items: action.payload.all_items };
    case FETCH_OFFERS:
      return { ...state, all_items: action.payload.items, offersFetched: true }; // PLACE OFFERS INTO all_items
    case GET_USER_ITEMS:
      return { ...state, userItems: action.payload.userItems };
    case GET_OFFER_ITEMS:
    return { ...state, offerItems: action.payload.offerItems };
    default:
      return state;
  }
}
