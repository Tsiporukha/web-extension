import React, {Component, PropTypes} from 'react';

import SongList from './SongList';

import {playlistDuration, withHours as durationWithHours} from '../lib/duration';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/queueStream.scss';

export default class QueueStream extends Component {

  state = {opened: false}

  toggleSongList = () => this.setState({opened: !this.state.opened});

  remove = () => this.props.remove([this.props.stream]);
  removeIfPlaylistEmpty = playlist => playlist.songs.length ? false : this.remove();

  componentWillReceiveProps(nextProps){
    return nextProps.stream.playlist.songs.length ? false : this.remove();
  }

  render(){
    return(
      <div className={`${styles.root} ${this.state.opened ? styles.opened : ''}`}>
        <div className={styles.artwork}>
          <img src={this.props.stream.artwork_url} />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{this.props.stream.playlist.title}</div>
          <div className={styles.userAvatar}>
            by <img src={this.props.stream.user.avatar_url} alt='user avatar' />
          </div>
          <div className={styles.duration}>
            <i className={`material-icons ${styles.time}`}>access_time</i>
            <span>{durationWithHours(playlistDuration(this.props.stream.playlist.songs))}</span>
            <i className={`material-icons ${styles.queue}`}>queue_music</i>
            <span>{this.props.stream.playlist.songs.length} tracks</span>
            <i className={`material-icons ${styles[ this.state.opened ? 'opened' : 'closed']}`} onClick={this.toggleSongList}>arrow_drop_down</i>
          </div>
        </div>
        <div className={styles.icons}>
          <i className={`material-icons ${styles.ripple}`} onClick={this.remove}>close</i>
        </div>
        <div className={`${styles.songList} ${this.state.opened ? styles.visible : ''}`}>
          <SongList
            type='queue'
            songs={this.props.stream.playlist.songs}
            remove={this.props.removeSong(this.props.stream.uid)}
            play={this.props.play}
          />
        </div>
      </div>
    );
  }
}
