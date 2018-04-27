import { combineReducers } from 'redux';
import auth from './auth_reducer';
import places from './places_reducer';
import userItems from './user_items_reducer';
import buyItems from './buy_items_reducer';
import user from './user_profile_reducer';

////////////////////////////////////////////////////////////////////////
// Combines reducers and assigns reducer names
export default combineReducers({
  places,
  auth,
  userItems,
  buyItems,
  user
});
