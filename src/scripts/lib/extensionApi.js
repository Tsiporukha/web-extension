import { v4 } from 'node-uuid';

import {setPlayingSongId, play, pause} from '../actions/PlayerActions';
import {addToCurrentQueueTop} from '../actions/SongsActions';
import * as EchoCli from './echoWebCliApi';

export const ExtApi = ({dispatch, getState}) => ({
  play: () => dispatch(play()),
  pause: () => dispatch(pause()),
  updatePlayingSongId: songId => dispatch(setPlayingSongId(songId)),
  addToQueueAndPlay: songs => {
    const fSongs = songs.map(song => ({...song, id: v4()}) );
    dispatch(addToCurrentQueueTop(fSongs));
    dispatch(setPlayingSongId(fSongs[0].id));
    return EchoCli.playSongFrom('currentQueue', fSongs[0]);
  }
})

export default ExtApi;
