import firebase from 'firebase';
import {
  MAKE_OFFER,
  OFFER_UPDATE,
  UPDATE_SEEN_OFFER,
  NEW_OFFER_NOTIFICATION,
  LOAD_OFFER
} from './types';


export const offerUpdate = ({ price }) => ({
  type: OFFER_UPDATE,
  payload: { price }
});

export const makeOffer = ({ price, key }) => dispatch => {
  const name = firebase.auth().currentUser.uid;
  console.log({amount: price, item: key, user: name, accepted: false });
  const offerRef = firebase.database().ref('offers')
    .push({ amount: price, item: key, user: name, accepted: false })
    .then((offerRef) => {
      //push the key of this offer to the user Profile
      firebase.database().ref(`users/${name}/offers`).update({ [offerRef.key]: true });
      firebase.database().ref(`items/${key}/offers`).update({ [offerRef.key]: true });
      dispatch({
        type: MAKE_OFFER,
        payload: { amount: price, item: key, user: name, accepted: false }
      });
    });
};

// gets initial offer IDs
const getInitialOffers = (callback) => {
  const offerIds = [];
  const { uid } = firebase.auth().currentUser;
  firebase.database().ref(`users/${uid}/items`)
    .on('value', snapshot => {
      if (snapshot.val()) {
        let counter = 0;
        const itemIds = Object.keys(snapshot.val());
        itemIds.forEach(itemId => {
          firebase.database().ref(`items/${itemId}/offers`)
            .once('value', snapshot => {
              if (snapshot.val()) {
                offerIds.push(...Object.keys(snapshot.val()));
              }
              counter++;
              if (itemIds.length === counter) { // done looping
                callback(offerIds);
              }
            });
        });
      }
    });
};

export const createOfferNotificationListener = () => dispatch => {
  getInitialOffers(offerIds => {
    // dispatch original offers
    offerIds.forEach(offerId => {
      dispatch({
        type: UPDATE_SEEN_OFFER,
        payload: { offerId }
      });
    });
    // check for more offers
    const { uid } = firebase.auth().currentUser;
    firebase.database().ref(`users/${uid}/items`)
      .on('value', snapshot => {
        const itemIds = Object.keys(snapshot.val());
        itemIds.forEach(itemId => {
          firebase.database().ref(`items/${itemId}/offers`)
            .on('child_added', childSnapshot => {
              const offerId = childSnapshot.key;
              dispatch({
                type: NEW_OFFER_NOTIFICATION,
                payload: { newOfferId: offerId, itemId }
              });
            });
        });
      });
  });
};

export const seeOffers = ({ itemId }) => dispatch => {
  firebase.database().ref(`items/${itemId}/offers`)
    .on('value', snapshot => {
      if (snapshot.val()) {
        const offerIds = Object.keys(snapshot.val());
        offerIds.forEach(offerId => {
          dispatch({
            type: UPDATE_SEEN_OFFER,
            payload: { offerId }
          });
        });
      }
    });
};

export const loadOffer = (offer) => ({
  type: LOAD_OFFER,
  payload: { offer }
});
