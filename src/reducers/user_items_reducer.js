import {
  ITEM_UPDATE,
  ITEM_CREATE,
  FETCH_USER_ITEMS,
  LOAD_EDIT_ITEM,
  FETCH_USERS,
  FETCH_ALL_ITEMS,
  FETCH_OFFERS,
  GET_USER_ITEMS,
  GET_OFFER_ITEMS,
  LOAD_ITEM,
  EDIT_ITEM,
  NEW_OFFER_NOTIFICATION
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
  userItems: [],
  offerItems: [],
  all_items: [],
  offers: [],
  item: {},
  name: '',
  description: '',
  price: '',
  offersFetched: false,
  itemId: ''
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
    case FETCH_USERS: // FETCHING USERS FROM user profile reducer
      if (action.payload.reducerPlacement === 'offers') {
        const offers = state.offers.slice(); //copy
        const newOffers = offers.map((offer) => {
          const user = action.payload.users.find(u => u.key === offer.user); // offer.user should be offer.userId later
          return { ...offer, name: user.name, profileURL: user.profileURL }; //THIS IS NOT THE FINAL RETURN
        });
        return {
          ...state,
          offers: newOffers
        };
      }
      return state;
    case LOAD_ITEM:
      return { ...state, item: action.payload.item, offersFetched: false };
    case FETCH_OFFERS: // new fetch offers
      return { ...state, offers: action.payload.offers, offersFetched: true };
    case GET_USER_ITEMS:
      return { ...state, userItems: action.payload.userItems };
    case GET_OFFER_ITEMS:
      return { ...state, offerItems: action.payload.offerItems };
    case NEW_OFFER_NOTIFICATION:
      return { ...state, itemId: action.payload.itemId };
    default:
      return state;
  }
}
