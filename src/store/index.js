import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate() // Store enhancer - Pulls data out and sends to different reducers
  )
);

// Whenever redux state changes, put it directly into AsyncStorage
// Whitelist says our redux state may have many different pieces of
// state/keys associated to it...we are only concerned with the
// likedJobs piece of state
//persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

// Run line below if want to purge AsyncStorage for this piece of state
//persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] }).purge();

export default store;
