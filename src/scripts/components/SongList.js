import React, {Component, PropTypes} from 'react';
import { List } from 'react-toolbox/lib/list';
import Song from './Song';

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
      <i className={`material-icons ${styles.bigIcon}`}>search</i> <br />
      <span>
        Play songs/playlists <i className='material-icons'>play_arrow</i> <br />
        Add to queue <i className='material-icons'>playlist_add</i> <br />
        Search YouTube, SoundCloud, Spotify <br />
        <b>Hint:</b> copy-paste song links into the Search Bar
      </span>
    </div>;

    const cQueue = <div className={`${styles.emptyQueue} ${styles.current}`}>
      <i className={`material-icons ${styles.bigIcon}`}>queue_music</i> <br />
      <span>
        Create/modify playlists<i className='material-icons'>add</i> <br />
        Clear <i className='material-icons'>clear_all</i> <br />
        <b>Hint:</b> Grag-n-drop songs from Search to Queue
      </span>
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
