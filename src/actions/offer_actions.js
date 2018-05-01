import firebase from 'firebase';
import { MAKE_OFFER, OFFER_UPDATE } from './types';

export const offerUpdate = ({ price }) => ({
    type: OFFER_UPDATE,
    payload: { price }
  });

export const makeOffer = ({price, key}) => dispatch => {
    const name = firebase.auth().currentUser.uid;
    const offerRef = firebase.database().ref('offers')
      .push( {amount: price, item: key, user: name })
      .then((offerRef) => {
          //push the key of this offer to the user Profile
          offerKey = firebase.database().ref(`users/${name}/offers`).update({[offerRef.key]: true});
          dispatch({
              type: MAKE_OFFER,
              payload: {amount: price, item: key, user: name }
          });
      });
    
    
  };