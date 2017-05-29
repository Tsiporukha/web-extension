import {ADD_SONGS, REMOVE_QUEUE_ITEMS, ADD_SONGS_TO_TOP, ADD_STREAM_TO_TOP,
  REMOVE_STREAM_SONG} from '../constants/ActionTypes';

const rmSongFromStream = (stream, songId) =>
  ({...stream, playlist: {...stream.playlist, songs: stream.playlist.songs.filter(song => song.id !== songId)}});
const isItemIn = (item, collection) => collection.some(it => (item.id === it.id && item.uid === it.uid));


export default (state = [], action) => {
  switch (action.type) {
    case ADD_SONGS:
      return state.concat(action.payload);
    case ADD_STREAM_TO_TOP:
      return [action.payload, ...state];
    case ADD_SONGS_TO_TOP:
      return (action.payload).concat(state);
    case REMOVE_QUEUE_ITEMS:
      return state.filter(s => !isItemIn(s, action.payload));
    case REMOVE_STREAM_SONG:
      return state.map(s => s.uid === action.payload.streamUid ? rmSongFromStream(s, action.payload.song.id) : s)
    default:
      return state;
  }
};
