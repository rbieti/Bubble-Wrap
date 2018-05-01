import {
    MAKE_OFFER,
    OFFER_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  price: 0,
  item: ''
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type){
    case OFFER_UPDATE:
      return { ...state, price: action.payload.price};
    case MAKE_OFFER:
      return { ...state, amount: action.payload.price, item: action.payload.item };
    default:
      return state;
    }
}

