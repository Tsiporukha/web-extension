import {updateSearchQueue, addToCurrentQueueTop, playCurrentQueueWith} from './SongsActions';
import {updateAutocomplete} from './AutocompleteActions';
import {next, prev} from './PlayerActions';
import {setUserData, updateUserData, cleanSession} from './SessionActions';
import {SEARCH_SONGS, SEARCH_AND_UPDATE_SEARCH_QUEUE, SEARCH_AND_UPDATE_AUTOCOMPLETE,
  PLAY_NEXT, PLAY_PREV, SEEK_TO, GET_AND_UPDATE_AUTOCOMPLETE, AUTH_USER, SET_USER_DATA,
  GET_STREAMS, ADD_SONGS_TO_TOP_AND_PLAY, UPDATE_CURRENT_USER_DATA} from '../constants/ActionTypes';
import {searchOnYoutube, getSuggestions} from '../lib/youtube';
import {login, getCurrentUserData} from '../lib/serverApi/session';
import * as Stream from '../lib/serverApi/streams';
import * as EchoCli from '../lib/echoWebCliApi';

function searchSongs(term){
  return dispatch => searchOnYoutube(term);
}

function searchAndUpdateSearchQueue(term) {
  return dispatch => searchOnYoutube(term).then(songs => dispatch(updateSearchQueue(songs)))
}

function getAndUpdateAutocomplete(term){
  return dispatch => getSuggestions(term).then(resp => dispatch(updateAutocomplete(resp[1])));
}

function addToCurrentQueueTopAndPlay(songs){
  return dispatch => {
    dispatch(addToCurrentQueueTop(songs));
    return EchoCli.either(() => EchoApi.playCurrentQueueWith(songs[0])(dispatch), () => playCurrentQueueWith(songs[0])(dispatch));
  }
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

function authUser({email, password}){
  return dispatch => login(email, password).then(userData => dispatch(setUserData(userData)));
}

function getStreams(filters){
  return (dispatch, getState) => Stream.get({...filters, token: getState().session.token})
}

const updateCurrentUserData = () => (dispatch, getState) => getCurrentUserData(getState().session.token)
  .then(user => dispatch(setUserData({user, token: getState().session.token}))).catch(err => dispatch(cleanSession()));

const aliases = {};
aliases[SEARCH_SONGS] = action => searchSongs(action.payload);
aliases[SEARCH_AND_UPDATE_SEARCH_QUEUE] = action => searchAndUpdateSearchQueue(action.payload);
aliases[GET_AND_UPDATE_AUTOCOMPLETE] = action => getAndUpdateAutocomplete(action.payload);
aliases[PLAY_NEXT] = action => playNextSong(action.payload.currentSong, action.payload.playlistPath);
aliases[PLAY_PREV] = action => playPrevSong(action.payload.currentSong, action.payload.playlistPath);
aliases[SEEK_TO] = action => seekTo(action.payload);
aliases[AUTH_USER] = action => authUser(action.payload);
aliases[GET_STREAMS] = action => getStreams(action.payload);
aliases[ADD_SONGS_TO_TOP_AND_PLAY] = action => addToCurrentQueueTopAndPlay(action.payload);
aliases[UPDATE_CURRENT_USER_DATA] = _ => updateCurrentUserData();

export default aliases;
