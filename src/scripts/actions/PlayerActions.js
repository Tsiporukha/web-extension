import {PLAY, PAUSE, SET_PLAYING_SONG, SET_VOLUME, SET_PROGRESS, CLEAN_PLAYER} from "../constants/ActionTypes";

export function play() {
  return {type: PLAY}
};

export function pause() {
  return {type: PAUSE}
}

export function clean() {
  return {type: CLEAN_PLAYER}
}

export function setPlayingSong(song) {
  return {
    type: SET_PLAYING_SONG,
    payload: song
  }
}

export function setVolume(volume) {
  return {
    type: SET_VOLUME,
    payload: volume
  }
}

export function setProgress(progress){
  return {
    type: SET_PROGRESS,
    payload: progress
  }
}
