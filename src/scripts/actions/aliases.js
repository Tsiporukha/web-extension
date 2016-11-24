import {updateSearchQueue} from './SongsActions';
import {updateAutocomplete} from './AutocompleteActions'
import {SEARCH_SONGS, SEARCH_AND_UPDATE_SEARCH_QUEUE, SEARCH_AND_UPDATE_AUTOCOMPLETE} from '../constants/ActionTypes';
import {searchOnYoutube} from '../lib/youtube';

function searchSongs(term){
  return dispatch => searchOnYoutube(term);
}

function searchAndUpdateSearchQueue(term) {
  return dispatch => searchOnYoutube(term).then(songs => { dispatch(updateSearchQueue(songs)) })
}

function searchAndUpdateAutocomplete(term) {
//  return dispatch => searchAutocomplete(term)
}

const aliases = {};
aliases[SEARCH_SONGS] = action => searchSongs(action.payload);
aliases[SEARCH_AND_UPDATE_SEARCH_QUEUE] = action => searchAndUpdateSearchQueue(action.payload);
aliases[SEARCH_AND_UPDATE_AUTOCOMPLETE] = action => searchAndUpdateAutocomplete(action.payload);

export default aliases;
