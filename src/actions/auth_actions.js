import { AsyncStorage } from 'react-native';
import { Facebook, SecureStore } from 'expo';
import firebase from 'firebase';
import { FACEBOOK_API_KEY } from '../constants/api_keys';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGIN_PASSWORD_RETYPE_CHANGED,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_ATTEMPT,
  RESET_APP_STATE,
  RESET_SIGNUP_LOGIN_PAGES
} from './types.js';

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/////////////////EMAIL/PASSWORD LOGIN METHODS///////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Called when e-mail address is updated
export const emailChanged = text => ({
  type: LOGIN_EMAIL_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password is updated
export const passwordChanged = text => ({
  type: LOGIN_PASSWORD_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password retype is updated
export const passwordRetypeChanged = text => ({
  type: LOGIN_PASSWORD_RETYPE_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password retype is updated
export const resetSignupLoginPages = () => ({
  type: RESET_SIGNUP_LOGIN_PAGES
});

////////////////////////////////////////////////////////////////
// Call appropriate FireBase method to login
export const loginUser = (email, password) => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    // Attempt to login user
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    //console.log(user);
    authUserSuccess(dispatch, user);
  } catch (err) {
    //console.error(err);
    loginUserFail(dispatch, 'Authentication Failed');
  }
};

////////////////////////////////////////////////////////////////
// Call appropriate FireBase method to signup user
export const signupUser = (email, password, passwordRetype) => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    if (password !== passwordRetype) {
      return loginUserFail(dispatch, 'Passwords do not match');
    }

    // Attempt to signup new user
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    //console.log(user);
    authUserSuccess(dispatch, user);
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        return loginUserFail(
          dispatch,
          `${email} already in use - Please try anothere-mail address or log in with a social media provider`
        );
      case 'auth/invalid-email':
        return loginUserFail(
          dispatch,
          `${email} is an invalid email address - Please ensure you typed your e-mail correctly`
        );
      case 'auth/weak-password':
        return loginUserFail(dispatch, 'Password is too weak - Please try again.');
      default:
        // console.log(err.message);
        return loginUserFail(dispatch, err.message);
    }
  }
};

////////////////////////////////////////////////////////////////
// Helper method for successful email/password login
const authUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_USER_SUCCESS,
    payload: user
  });
};

////////////////////////////////////////////////////////////////
// Helper method for failed email/password login
const loginUserFail = (dispatch, error = '') => {
  dispatch({
    type: AUTH_USER_FAIL,
    payload: error
  });
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////FACEBOOK LOGIN METHODS///////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Checks to see if we already have a facebook token; if so, pass
// it to the reducer; if not, attempt to login.
export const facebookLogin = () => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    // Get item out of device storage; it will take time, so wait
    // for it to complete; after we receive, assign to variable token
    //const token = await AsyncStorage.getItem('fb_token');
    const token = await SecureStore.getItemAsync('fb_token');

    // Can now pretend it was synchronous call
    if (token) {
      console.log(`FB Token exists: ${token}`);
      await loginWithFacebookToken(token, dispatch);

      // Dispatch an action saying FB login is done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      // Start up FB login process
      doFacebookLogin(dispatch);
    }
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////
// Helper function (not an action creator) -
const doFacebookLogin = async dispatch => {
  try {
    // This line will popup a modal where user can login to FB
    // Result contains type property (status) and token property - so destructure b/c
    // that's all we care about
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_API_KEY, {
      permissions: ['public_profile', 'email'] // Asking for FB permissions
    });

    if (type === 'cancel') {
      return dispatch({
        type: FACEBOOK_LOGIN_FAIL,
        payload: 'Facebook login cancelled/failed'
      });
    }

    await loginWithFacebookToken(token, dispatch);
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////
// Login to Firebase w/ Facebook Token
const loginWithFacebookToken = async (token, dispatch) => {
  try {
    // Build Firebase credential with the Facebook access token
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in w/ credential from the Facebook user
    await firebase.auth().signInWithCredential(credential);

    // Save token onto device memory and dispatch action
    //await AsyncStorage.setItem('fb_token', token);
    await SecureStore.setItemAsync('fb_token', token); // Encrypts before storing!
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } catch (err) {
    //await AsyncStorage.removeItem('fb_token'); // Remove if exists
    await SecureStore.deleteItemAsync('fb_token');
    console.error(err);
    return dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: 'Facebook login cancelled/failed' });
  }
};

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////SHARED METHODS///////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Called when user wants to signout
export const signoutUser = () => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    // Attempt to signout user
    await firebase.auth().signOut();
    //await AsyncStorage.removeItem('fb_token'); // Remove if exists
    await SecureStore.deleteItemAsync('fb_token');

    // Dispatch signout user event
    dispatch({ type: RESET_APP_STATE });
  } catch (err) {
    console.error(err);
  }
};
