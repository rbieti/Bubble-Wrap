import { combineReducers } from "redux";
import auth from "./auth_reducer";
import places from "./places_reducer";

////////////////////////////////////////////////////////////////////////
// Combines reducers and assigns reducer names
export default combineReducers({
  places,
  auth
});
