import {updateSearchQueue, addToCurrentQueueTop, playCurrentQueueWith} from './SongsActions';
import {updateAutocomplete} from './AutocompleteActions';
import {next, prev} from './PlayerActions';
import {setUserData, updateUserData, cleanSession} from './SessionActions';
import {maybeUpdate as maybeUpdateStream} from './StreamsActions';
import {SEARCH_SONGS, SEARCH_AND_UPDATE_SEARCH_QUEUE, SEARCH_AND_UPDATE_AUTOCOMPLETE,
  PLAY_NEXT, PLAY_PREV, SEEK_TO, GET_AND_UPDATE_AUTOCOMPLETE, AUTH_USER, SET_USER_DATA,
  GET_STREAMS, ADD_SONGS_TO_TOP_AND_PLAY, UPDATE_CURRENT_USER_DATA, LIKE_STREAM,
  UNLIKE_STREAM, UPLOAD_ARTWORK, CREATE_STREAM, SET_ECHO_CLI_SESSION} from '../constants/ActionTypes';
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
    return EchoCli.either(() => EchoCli.playCurrentQueueWith(songs[0])(dispatch), () => playCurrentQueueWith(songs[0])(dispatch));
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

const likeStream = stream => (dispatch, getState) => Stream.like(stream.id, getState().session.token)
  .then(data => maybeUpdateStream(data.status, {...stream, likes_count: stream.likes_count + 1, your_likes: 1})(dispatch));
const unlikeStream = stream => (dispatch, getState) => Stream.unlike(stream.id, getState().session.token)
  .then(data => maybeUpdateStream(data.status, {...stream, likes_count: stream.likes_count - 1, your_likes: 0})(dispatch));

const updateCurrentUserData = () => (dispatch, getState) => getCurrentUserData(getState().session.token)
  .then(user => dispatch(setUserData({user, token: getState().session.token}))).catch(err => dispatch(cleanSession()));

const uploadArtwork = ({imageBase64Url, filename}) => (dispatch, getState) => Stream.uploadArtwork(imageBase64Url, filename, getState().session.token);

const createStream = ({playlist_title, tags, default_artwork_url, songs}) => (dispatch, getState) =>
  Stream.create(playlist_title, tags, default_artwork_url, songs, getState().session.token)

const setEchoCliSession = () => dispatch => dispatch(setUserData(EchoCli.getSession()));

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
aliases[LIKE_STREAM] = action => likeStream(action.payload);
aliases[UNLIKE_STREAM] = action => unlikeStream(action.payload);
aliases[UPLOAD_ARTWORK] = action => uploadArtwork(action.payload);
aliases[CREATE_STREAM] = action => createStream(action.payload);
aliases[SET_ECHO_CLI_SESSION] = _ => setEchoCliSession();

export default aliases;
