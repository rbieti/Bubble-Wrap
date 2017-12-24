import {
  FETCH_PLACES,
  LOAD_PLACE_DETAILS,
  UPDATE_PLACE_DETAILS,
  RESET_APP_STATE
} from '../actions/types';

const INITIAL_STATE = {
  placesResponse: null,
  selectedPlace: null,
  selectedPlaceDetails: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PLACES:
      return { ...state, placesResponse: action.payload };
    case LOAD_PLACE_DETAILS:
      return {
        ...state,
        selectedPlace: action.payload.place,
        selectedPlaceDetails: action.payload.placeDetails
      };
    case UPDATE_PLACE_DETAILS:
      return { ...state, selectedPlaceDetails: action.payload };
    case RESET_APP_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
