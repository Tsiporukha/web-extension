import {combineReducers} from 'redux';

import currentQueue from './currentQueue';
import searchQueue from './searchQueue';
import searchAutocomplete from './searchAutocomplete';
import player from './player';

export default combineReducers({
  currentQueue,
  searchQueue,
  searchAutocomplete,
  player
});
