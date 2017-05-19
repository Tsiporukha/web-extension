import { v4 } from 'node-uuid';
import * as types from '../constants/ActionTypes';
import {setPlayingSong, play} from './PlayerActions';

const addIdAndPlaylistTitle = (songs, playlistTitle) => songs.map(song => ({id: v4(), playlist: playlistTitle, ...song}));

export const addToCurrentQueue = songs => ({
  type: types.ADD_SONGS,
  payload: addIdAndPlaylistTitle(songs, 'currentQueue')
});

export const addToCurrentQueueTop = songs => ({
  type: types.ADD_SONGS_TO_TOP,
  payload: addIdAndPlaylistTitle(songs, 'currentQueue')
});

export const addStreamToCurrentQueueTop = stream => ({
  type: types.ADD_STREAM_TO_TOP,
  payload: stream
});

export const addToCurrentQueueTopAndPlay = songs => ({
  type: types.ADD_SONGS_TO_TOP_AND_PLAY,
  payload: addIdAndPlaylistTitle(songs, 'currentQueue')
});

export const removeFromCurrentQueue = songs => ({
  type: types.REMOVE_SONGS,
  payload: songs
});

export const updateSearchQueue = songs => ({
  type: types.UPDATE_SEARCH_QUEUE,
  payload: songs
});

export const searchSongs = term => ({
  type: types.SEARCH_SONGS,
  payload: term
});

export const searchAndUpdateSearchQueue = term => ({
  type: types.SEARCH_AND_UPDATE_SEARCH_QUEUE,
  payload: term
});

export const playCurrentQueueWith = song => dispatch => {
  dispatch(setPlayingSong({...song, playlist: 'currentQueue'}));
  return dispatch(play());
}
