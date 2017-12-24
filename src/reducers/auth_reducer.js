import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGIN_PASSWORD_RETYPE_CHANGED,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_ATTEMPT,
  AUTH_SIGNOUT_USER,
  RESET_SIGNUP_LOGIN_PAGES,
  RESET_APP_STATE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordRetype: '',
  user: null,
  error: '',
  loading: false,
  fb_token: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, fb_token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload, fb_token: null };
    case LOGIN_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case LOGIN_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_PASSWORD_RETYPE_CHANGED:
      return { ...state, passwordRetype: action.payload };
    case AUTH_USER_ATTEMPT:
      return { ...state, loading: true, error: '' };
    case AUTH_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case AUTH_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        password: '',
        passwordRetype: '',
        loading: false
      };
    case RESET_APP_STATE:
    case AUTH_SIGNOUT_USER:
    case RESET_SIGNUP_LOGIN_PAGES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
