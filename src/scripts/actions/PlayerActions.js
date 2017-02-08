import {PLAY, PAUSE, SET_PLAYING_SONG, SET_VOLUME, SET_PROGRESS, CLEAN_PLAYER,
  PLAY_NEXT, PLAY_PREV, SEEK_TO, SET_SEEKING, SET_PLAYING_SONG_ID} from "../constants/ActionTypes";
import {at, findIndex} from 'lodash';


export function play() {
  return {type: PLAY}
}

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

export function setPlayingSongId(songId) {
  return {
    type: SET_PLAYING_SONG_ID,
    payload: songId
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

export function playNextSong(currentSong, playlistPath){
  return{
    type: PLAY_NEXT,
    payload: {currentSong, playlistPath}
  }
}

export function playPrevSong(currentSong, playlistPath){
  return{
    type: PLAY_PREV,
    payload: {currentSong, playlistPath}
  }
}

export function seekTo(val){
  return{
    type: SEEK_TO,
    payload: val
  }
}

export function setSeeking(bool){
  return{
    type: SET_SEEKING,
    payload: bool
  }
}


export function next(currentSong, playlistPath) {
  return (dispatch, getState) =>
    playNext(currentSong, playlistPath, getNextSong)(dispatch, getState);
}

export function prev(currentSong, playlistPath) {
  return (dispatch, getState) =>
    playNext(currentSong, playlistPath, getPrevSong)(dispatch, getState);
}


function getPlaylist(playlistPath){
  return getState => at(getState(), playlistPath)[0];
}

function getSongIndex(playlist, song) {
  return findIndex(playlist, {id: song.id});
}

function playNext(currentSong, playlistPath, getNextSongToPlay){
  return (dispatch, getState) => {
    const currentPlaylist = getPlaylist(playlistPath)(getState);
    if(!currentPlaylist) return Promise.resolve();
    const currentSongIndex = getSongIndex(currentPlaylist, currentSong);
    const nextSong = getNextSongToPlay(currentPlaylist, currentSongIndex);
    return dispatch(setPlayingSong({...nextSong, playlist: playlistPath}));
  }
}

function getNextSong(playlist, currentSongIndex) {
  return currentSongIndex == playlist.length-1 ?
    playlist[0] : playlist[currentSongIndex+1];
}

function getPrevSong(playlist, currentSongIndex) {
  return currentSongIndex == 0 ?
    playlist[ playlist.length-1] : playlist[currentSongIndex-1];
}
