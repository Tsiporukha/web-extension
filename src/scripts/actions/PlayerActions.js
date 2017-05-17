import {PLAY, PAUSE, SET_PLAYING_SONG, SET_VOLUME, SET_PROGRESS, CLEAN_PLAYER,
  PLAY_NEXT, PLAY_PREV, SEEK_TO, SET_SEEKING, SET_PLAYING_SONG_ID} from "../constants/ActionTypes";
import {at, findIndex} from 'lodash';


export const play = () => ({type: PLAY});

export const pause = () => ({type: PAUSE});

export const clean = () => ({type: CLEAN_PLAYER});

export const setPlayingSong = song => ({
  type: SET_PLAYING_SONG,
  payload: song
});

export const setPlayingSongId = songId => ({
  type: SET_PLAYING_SONG_ID,
  payload: songId
});

export const setVolume = volume => ({
  type: SET_VOLUME,
  payload: volume
});

export const setProgress = progress => ({
  type: SET_PROGRESS,
  payload: progress
});

export const playNextSong = (currentSong, playlistPath) => ({
  type: PLAY_NEXT,
  payload: {currentSong, playlistPath}
});

export const playPrevSong = (currentSong, playlistPath) => ({
  type: PLAY_PREV,
  payload: {currentSong, playlistPath}
});

export const seekTo = val => ({
  type: SEEK_TO,
  payload: val
});

export const setSeeking = bool => ({
  type: SET_SEEKING,
  payload: bool
});

export const next = (currentSong, playlistPath) => (dispatch, getState) =>
  playNext(currentSong, playlistPath, getNextSong)(dispatch, getState);

export const prev = (currentSong, playlistPath) => (dispatch, getState) =>
  playNext(currentSong, playlistPath, getPrevSong)(dispatch, getState);


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
