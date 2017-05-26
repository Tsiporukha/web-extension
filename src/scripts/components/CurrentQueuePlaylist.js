import React, {Component, PropTypes} from 'react';
import Song from './Song';
import QueueStream from './QueueStream';
import {getFilePath} from '../lib/envDifferences';
import {isSong} from '../lib/stream';

import styles from '../../assets/styles/songList.scss';


const emptyCurrentQueue = <div className={`${styles.emptyQueue} ${styles.current}`}>
  <img src={getFilePath(require('../../assets/images/empty_queue.png'))}  className={styles.eqImg}  alt='empty queue' />
</div>;


const CurrentQueuePlaylist = props => (props.playlist.length ?
  <div> {props.playlist.map(item => isSong(item) ?
    <Song
      type='queue'
      song={item}
      key={item.id}
      remove={props.removeFromCurrentQueue}
      play={props.play}
    />
    :
    <QueueStream
      key={item.uid}
      stream={item}
      remove={props.removeFromCurrentQueue}
      removeSong={props.removeSongFromQueueStream}
      play={props.play}
    />
  )} </div>
  :
  emptyCurrentQueue
);

CurrentQueuePlaylist.propTypes = {
  playlist: PropTypes.array,

  play: PropTypes.func,
  removeFromCurrentQueue: PropTypes.func
}

export default CurrentQueuePlaylist;
