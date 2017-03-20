import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {alias} from 'react-chrome-redux';
import throttle from 'lodash/throttle';

import {loadState, saveState} from './localStorage'
import rootReducer from '../reducers';
import aliases from '../actions/aliases';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(rootReducer, loadState(), composeEnhancers(
    applyMiddleware(alias(aliases), thunkMiddleware))); // a normal Redux store

  store.subscribe(throttle(() => saveState({
    currentQueue: store.getState().currentQueue,
    session: store.getState().session
  }), 1000));

  return store;
}

export default configureStore;
