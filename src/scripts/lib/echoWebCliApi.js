import at from 'lodash/at';
import {loadState} from '../store/localStorage.js';

const CURRENT_QUEUE_ID = -1;
const getPlayingPlaylist = () => window.echoApi.getPlayingPlaylist() || {};
const getSongIndex = (songs, song) => songs.findIndex(sng => sng.id == song.id);

export const isEchoApi = () => !!window.echoApi;
export const isPlaylistPlaying = playlistId => getPlayingPlaylist().id == playlistId;

export function either(right, left = () => false) {
  return isEchoApi() ? right() : left();
}


export function playQueue(songs, playingSongPosition = 0) {
  return window.echoApi.playStream(createStreamData(songs), playingSongPosition);
}

export function playSongFrom(path, song) {
  const songs = getSongsFromLocalStorage(path);
  return playQueue(songs, getSongIndex(songs, song));
}

export function maybeUpdatePlaylistSongs(path, streamId = CURRENT_QUEUE_ID) {
  return getPlayingPlaylist().id == streamId ?
   window.echoApi.updatePlaylistSongs(getSongsFromLocalStorage(path), streamId) :
   false
}


function createStreamData(songs) {
  return {
    playlist: {
      title: 'Current Queue',
      songs
    },
    id: CURRENT_QUEUE_ID,
    history_listeners:[]
  }
}


function getSongsFromLocalStorage (path) {
  return at(loadState(), path)[0];
}
