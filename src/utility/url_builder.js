import { Dimensions } from 'react-native';
import qs from 'qs';
import {
  GOOGLE_PLACES_ROOT_URL,
  GOOGLE_GEOCODE_ROOT_URL,
  GOOGLE_PLACES_PHOTO_ROOT_URL
} from '../constants/google_api';
import { GOOGLE_PLACES_API_KEY } from '../constants/api_keys';

////////////////////////////////////////////////////////////////////////////////////////
// Build Google Places URL according to: https://developers.google.com/maps/documentation/geocoding/start
export const buildGeocodeUrl = location => {
  const query = qs.stringify({ ...GEOCODE_QUERY_PARAMS, address: location });
  return `${GOOGLE_GEOCODE_ROOT_URL}${query}`;
};
const GEOCODE_QUERY_PARAMS = {
  key: GOOGLE_PLACES_API_KEY
};

////////////////////////////////////////////////////////////////////////////////////////
// Build Google Places URL according to: https://developers.google.com/places/web-service/
export const buildPlacesUrl = (place, latLongCoords) => {
  const { lat, lng } = latLongCoords;
  const coords = `${lat},${lng}`;
  const query = qs.stringify({
    ...PLACE_QUERY_PARAMS,
    name: place,
    location: coords
  });
  return `${GOOGLE_PLACES_ROOT_URL}${query}`;
};
const PLACE_QUERY_PARAMS = {
  key: GOOGLE_PLACES_API_KEY,
  types: 'food',
  radius: '10000' // In meters (max 50000)
};

////////////////////////////////////////////////////////////////////////////////////////
// Build Google Places Photo URL wrt: https://developers.google.com/places/web-service/photos
export const buildPlacesPhotoUrl = (photoRef, width = SCREEN_WIDTH) => {
  const query = qs.stringify({
    ...PLACE_PHOTO_QUERY_PARAMS,
    photoreference: photoRef,
    maxwidth: width
  });
  return `${GOOGLE_PLACES_PHOTO_ROOT_URL}${query}`;
};
const PLACE_PHOTO_QUERY_PARAMS = {
  key: GOOGLE_PLACES_API_KEY
};
const SCREEN_WIDTH = Dimensions.get('window').width;
