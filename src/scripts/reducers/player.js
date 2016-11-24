import {PLAY, PAUSE, SET_PLAYING_SONG, SET_VOLUME, SET_PROGRESS} from '../constants/ActionTypes';

const initialState = {
  currentSong: {},
  playing: true,
  volume: 0.8,
  played: 0,
  loaded: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return  {...state, playing: true};
    case PAUSE:
      return  {...state, playing: false};
    case SET_PLAYING_SONG:
      return  {...state, currentSong: action.payload, loaded: 0, played: 0};
    case SET_VOLUME:
      return {...state, volume: action.payload}
    case SET_PROGRESS:
      return {...state, ...action.payload}
    default:
      return state;
  }
};
