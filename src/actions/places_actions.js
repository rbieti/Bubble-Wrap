import firebase from 'firebase';
import axios from 'axios';
import { FETCH_PLACES, LOAD_PLACE_DETAILS, UPDATE_PLACE_DETAILS } from './types';
import * as urlBuilder from '../utility/url_builder';

////////////////////////////////////////////////////////////////////////////////////////
// Makes multiple calls to Google Maps APIs to obtain places info.
// Inputs: place (Restaurant Name String), location (Address String)
export const fetchPlaces = (place, location, callbackFunction) => async dispatch => {
  // We have lat/long value from user's map locatino - indeed
  // expects city/state or postal code - need to convert

  try {
    // Get the latitude/longitude from city/address using Google Geocode API Service
    const geocodeUrl = urlBuilder.buildGeocodeUrl(location);
    const { data } = await axios.get(geocodeUrl);
    const latLongCoords = data.results[0].geometry.location;
    // console.log(geocodeUrl);
    // console.log(latLongCoords);

    // Get the places using Google Places API Service
    const placesUrl = urlBuilder.buildPlacesUrl(place, latLongCoords);
    const placesResponse = await axios.get(placesUrl);
    const placesData = placesResponse.data;

    // Add the geocoded lat/long to the payload (for use with map)
    const searchRegion = {
      latitude: latLongCoords.lat,
      longitude: latLongCoords.lng,
      longitudeDelta: 0.04, // Zoom level
      latitudeDelta: 0.09 // Zoom level
    };
    const placesDataWithSearchRegion = { ...placesData, searchRegion };

    // Dispatch the action and call the callback function

    dispatch({ type: FETCH_PLACES, payload: placesDataWithSearchRegion });
    callbackFunction();
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////
// Makes Firebase call to fetch details about soda quality for this place
// Inputs: place (JSON object from Google Places API)
export const loadPlaceDetails = (place, callbackFunction) => async dispatch => {
  try {
    // Attempt to load place and place details (including soda info)
    await firebase
      .database()
      .ref(`/places/${place.place_id}/availableSodas`)
      .on('value', snapshot => {
        dispatch({
          type: LOAD_PLACE_DETAILS,
          payload: { place, placeDetails: snapshot.val() }
        });
        callbackFunction();
      });
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////
// Makes Firebase call to add new details about soda quality for this place
export const createNewPlaceDetails = (
  place,
  availableSodas,
  callbackFunction
) => async dispatch => {
  try {
    // Attempt to load place and place details (including soda info)
    const ref = await firebase
      .database()
      .ref(`/places/${place.place_id}/availableSodas`)
      .push(availableSodas);

    //console.log('UPDATING TO:');
    //console.log(ref.key);
    const newObject = {};
    newObject[ref.key] = availableSodas;

    dispatch({ type: UPDATE_PLACE_DETAILS, payload: newObject });
    callbackFunction();
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////////////////////////////
// Makes Firebase call to add new details about soda quality for this place
export const updatePlaceDetails = (
  place,
  availSodasRef,
  availableSodas,
  callbackFunction
) => async dispatch => {
  try {
    // Attempt to load place and place details (including soda info)
    await firebase
      .database()
      .ref(`/places/${place.place_id}/availableSodas/${availSodasRef}`)
      .set(availableSodas);

    //console.log('UPDATING TO ***:');
    //console.log(availSodasRef);
    const newObject = {};
    newObject[availSodasRef] = availableSodas;

    dispatch({ type: UPDATE_PLACE_DETAILS, payload: newObject });
    callbackFunction();
  } catch (err) {
    console.error(err);
  }
};
