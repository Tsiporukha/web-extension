import {updateSearchQueue} from './SongsActions';
import {SEARCH_SONGS, SEARCH_AND_UPDATE_SEARCH_QUEUE} from '../constants/ActionTypes';
import {searchOnYoutube} from '../lib/youtube';

function searchSongs(term){
  return dispatch => searchOnYoutube(term);
}

function searchAndUpdateSearchQueue(term) {
  return dispatch => searchOnYoutube(term).then(songs => { dispatch(updateSearchQueue(songs)) })
}


const aliases = {};
aliases[SEARCH_SONGS] = action => searchSongs(action.payload);
aliases[SEARCH_AND_UPDATE_SEARCH_QUEUE] = action => searchAndUpdateSearchQueue(action.payload);

export default aliases;
