import {updateSearchQueue} from './SongsActions';
import {updateAutocomplete} from './AutocompleteActions';
import {SEARCH_SONGS, SEARCH_AND_UPDATE_SEARCH_QUEUE, SEARCH_AND_UPDATE_AUTOCOMPLETE,
  PLAY_NEXT, PLAY_PREV, SEEK_TO, GET_AND_UPDATE_AUTOCOMPLETE} from '../constants/ActionTypes';
import {searchOnYoutube, getSuggestions} from '../lib/youtube';
import {next, prev} from './PlayerActions';

function searchSongs(term){
  return dispatch => searchOnYoutube(term);
}

function searchAndUpdateSearchQueue(term) {
  return dispatch => searchOnYoutube(term).then(songs => dispatch(updateSearchQueue(songs)))
}

function getAndUpdateAutocomplete(term){
  return dispatch => getSuggestions(term).then(resp => dispatch(updateAutocomplete(resp[1])));
}

function playNextSong(currentSong, playlistPath){
  return (dispatch, getState) => next(currentSong, playlistPath)(dispatch, getState);
}

function playPrevSong(currentSong, playlistPath){
  return (dispatch, getState) => prev(currentSong, playlistPath)(dispatch, getState);
}

function seekTo(val){
  return () => window.bgReactPlayer.seekTo(val);
}

const aliases = {};
aliases[SEARCH_SONGS] = action => searchSongs(action.payload);
aliases[SEARCH_AND_UPDATE_SEARCH_QUEUE] = action => searchAndUpdateSearchQueue(action.payload);
aliases[GET_AND_UPDATE_AUTOCOMPLETE] = action => getAndUpdateAutocomplete(action.payload);
aliases[PLAY_NEXT] = action => playNextSong(action.payload.currentSong, action.payload.playlistPath);
aliases[PLAY_PREV] = action => playPrevSong(action.payload.currentSong, action.payload.playlistPath);
aliases[SEEK_TO] = action => seekTo(action.payload);

export default aliases;
