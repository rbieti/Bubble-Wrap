import {
  MAKE_OFFER,
  OFFER_UPDATE,
  UPDATE_SEEN_OFFER,
  NEW_OFFER_NOTIFICATION
} from '../actions/types';

const INITIAL_STATE = {
  price: 0,
  item: '',
  newOffersCount: 0,
  seenOfferIds: {},
  newOfferIds: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OFFER_UPDATE:
      return { ...state, price: action.payload.price };
    case MAKE_OFFER:
      return { ...state, amount: action.payload.price, item: action.payload.item };
    case UPDATE_SEEN_OFFER:
      const seenOfferIds = { ...state.seenOfferIds, [action.payload.offerId]: true };
      const newOfferIds = { ...state.newOfferIds };
      Object.keys(seenOfferIds).forEach(seenOfferId => {
        delete newOfferIds[seenOfferId];
      });
      return { ...state, seenOfferIds, newOfferIds, newOffersCount: Object.keys(newOfferIds).length };
    case NEW_OFFER_NOTIFICATION:
      if (!(action.payload.newOfferId in state.seenOfferIds)) {
        const newOfferIds = { ...state.newOfferIds, [action.payload.newOfferId]: true };
        return {
          ...state,
          newOfferIds,
          newOffersCount: Object.keys(newOfferIds).length
        };
      }
      return state;
    default:
      return state;
  }
}

