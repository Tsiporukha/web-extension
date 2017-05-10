import React, {Component, PropTypes} from 'react';
import { List } from 'react-toolbox/lib/list';
import Song from './Song';
import {getFilePath} from '../lib/envDifferences';

import styles from '../../assets/styles/songList.scss';

export default class SongList extends Component {

  static propTypes = {
    songs: PropTypes.array,

    addToCurrentQueue: PropTypes.func,
    play: PropTypes.func,
    removeFromCurrentQueue: PropTypes.func
  }

  render() {
    const sQueue = <div className={styles.emptyQueue}>
      <img src={getFilePath(require('../../assets/images/empty_search.png'))} className={styles.esImg} alt='empty search' />
    </div>;

    const cQueue = <div className={`${styles.emptyQueue} ${styles.current}`}>
      <img src={getFilePath(require('../../assets/images/empty_queue.png'))}  className={styles.eqImg}  alt='empty queue' />
    </div>;

    return (
      (this.props.songs && this.props.songs.length) ?
        <div> {this.props.songs.map(song => (
          <Song
            song={song}
            key={song.id || song.uid}
            addToCurrentQueue={this.props.addToCurrentQueue}
            removeFromCurrentQueue={this.props.removeFromCurrentQueue}
            play={this.props.play}
          />)
        )}
        </div>
        :
        (this.props.removeFromCurrentQueue ? cQueue : sQueue)
    );
  }

}
