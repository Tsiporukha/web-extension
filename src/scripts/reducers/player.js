import {PLAY, PAUSE, SET_PLAYING_SONG, SET_VOLUME, SET_PROGRESS, CLEAN_PLAYER} from '../constants/ActionTypes';

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
      const progress = (state.currentSong.id == action.payload.id) ?
        {} : {loaded: 0, played: 0};
      return  {...state, currentSong: action.payload, ...progress};
    case SET_VOLUME:
      return {...state, volume: action.payload}
    case SET_PROGRESS:
      return {...state, ...action.payload}
    case CLEAN_PLAYER:
      return initialState;
    default:
      return state;
  }
};
