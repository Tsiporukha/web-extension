import React, {Component, PropTypes} from 'react';
import Song from './Song';
import {getFilePath} from '../lib/envDifferences';

import styles from '../../assets/styles/songList.scss';


const emptySearchQueue = <div className={styles.emptyQueue}>
  <img src={getFilePath(require('../../assets/images/empty_search.png'))} className={styles.esImg} alt='empty search' />
</div>;

const SongList = props => (props.songs.length ?
  <div> {props.songs.map(song =>
    <Song
      type={props.type}
      song={song}
      key={song.id || song.uid}
      addToCurrentQueue={props.addToCurrentQueue}
      removeFromCurrentQueue={props.removeFromCurrentQueue}
      play={props.play}
    />
  )} </div>
  :
  emptySearchQueue
);


SongList.propTypes = {
  type: PropTypes.string,
  songs: PropTypes.array,

  addToCurrentQueue: PropTypes.func,
  play: PropTypes.func,
  removeFromCurrentQueue: PropTypes.func
}

export default SongList;
