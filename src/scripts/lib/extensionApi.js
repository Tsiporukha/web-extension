import { v4 } from 'node-uuid';

import {setPlayingSongId, play, pause} from '../actions/PlayerActions';
import {addToCurrentQueueTop, addStreamToCurrentQueueTop} from '../actions/SongsActions';
import * as EchoCli from './echoWebCliApi';

const addIdToSongs = songs =>  songs.map(song => ({...song, id: v4()}));
const addIdToStreamSongs = stream =>  ({...stream, playlist: {...stream.playlist, songs: addIdToSongs(stream.playlist.songs)}});
const setPlayingSongIdAndPlay = song => dispatch => {
  dispatch(setPlayingSongId(song.id));
  return EchoCli.playSongFrom('currentQueue', song);
};

const addToQueueAndPlay = (action, payload, songToPlay) => dispatch =>
  Promise.resolve(dispatch(action(payload))).then(_ => setPlayingSongIdAndPlay(songToPlay)(dispatch));
const addSongsToQueueAndPlay = songs => dispatch => addToQueueAndPlay(addToCurrentQueueTop, songs, songs[0])(dispatch);
const addStreamToQueueAndPlay = stream => dispatch => addToQueueAndPlay(addStreamToCurrentQueueTop, stream, stream.playlist.songs[0])(dispatch);


export const ExtApi = ({dispatch, getState}) => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  updatePlayingSongId: songId => dispatch(setPlayingSongId(songId)),
  addToQueueAndPlay: songs => addSongsToQueueAndPlay(addIdToSongs(songs))(dispatch),
  addStreamToQueueAndPlay: stream => addStreamToQueueAndPlay(addIdToStreamSongs(stream))(dispatch)
})

export default ExtApi;
