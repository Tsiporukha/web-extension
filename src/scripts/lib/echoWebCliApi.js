import findIndex from 'lodash/findIndex';
import at from 'lodash/at';
import {loadState} from '../store/localStorage.js';

export function isEchoApi(){ return !!window.echoApi }

export function playQueue(songs, playingSongPosition = 0) {
  return window.echoApi.playStream(createStreamData(songs), playingSongPosition);
}

export function playSongFrom(path, song) {
  const songs = getSongsFromLocalStorage(path);
  return playQueue(songs, getSongIndex(songs, song));
}

export function either(right, left = () => false) {
  return isEchoApi() ? right() : left();
}


function createStreamData(songs) {
  return {
    playlist: {
      title: 'Current Queue',
      songs
    },
    id: -1,
    history_listeners:[]
  }
}

function getSongIndex(songs, song){
  return findIndex(songs, {id: song.id});
}

function getSongsFromLocalStorage (path) {
  return at(loadState(), path)[0];
}
