import {PLAY, PAUSE, SET_PLAYING_SONG, SET_VOLUME, SET_PROGRESS, CLEAN_PLAYER,
  SET_SEEKING, SET_PLAYING_SONG_ID} from '../constants/ActionTypes';
import * as EchoCli from '../lib/echoWebCliApi';

const initSongId = EchoCli.either(EchoCli.getPlayingSongId) || '';

const initialState = {
  currentSong: {id: initSongId},
  playing: true,
  volume: 0.8,
  played: 0,
  loaded: 0,
  seeking: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return  {...state, playing: true};
    case PAUSE:
      return  {...state, playing: false};
    case SET_PLAYING_SONG:
      const progress = (state.currentSong.id == action.payload.id) ?
        {} : {loaded: 0, played: 0};
      return  {...state, currentSong: action.payload, ...progress};
    case SET_PLAYING_SONG_ID:
      return  {...state, currentSong: {id: action.payload}};
    case SET_VOLUME:
      return {...state, volume: action.payload}
    case SET_PROGRESS:
      return {...state, ...action.payload}
    case SET_SEEKING:
      return {...state, seeking: action.payload}
    case CLEAN_PLAYER:
      return initialState;
    default:
      return state;
  }
};
