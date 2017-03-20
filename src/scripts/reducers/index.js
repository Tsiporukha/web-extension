import {combineReducers} from 'redux';

import currentQueue from './currentQueue';
import searchQueue from './searchQueue';
import searchAutocomplete from './searchAutocomplete';
import player from './player';
import session from './session';

export default combineReducers({
  currentQueue,
  searchQueue,
  searchAutocomplete,
  player,
  session
});
