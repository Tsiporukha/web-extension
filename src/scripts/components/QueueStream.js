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

  openStreamInNewTab = id => () => Promise.resolve(window.open(`http://beta.echoapplication.com/#/feed/${id}`)).then(win => win.focus());

  componentWillReceiveProps(nextProps){
    return nextProps.stream.playlist.songs.length ? false : this.remove();
  }

  render(){
    return(
      <div className={`${styles.root} ${this.state.opened ? styles.opened : ''}`}>
        <div style={{cursor: 'pointer'}} onClick={this.toggleSongList}>
          <div className={styles.artwork}>
            <img src={this.props.stream.artwork_url} />
          </div>
          <div className={styles.info}>
            <div className={styles.title}>
              {this.props.stream.playlist.title}
              <i className={`material-icons ${styles.openInNew}`} onClick={this.openStreamInNewTab(this.props.stream.id)}>open_in_new</i>
            </div>
            <div className={styles.userAvatar}>
              by <img src={this.props.stream.user.avatar_url} alt='user avatar' />
              <span className={styles.username}>{this.props.stream.user.name}</span>
            </div>
            <div className={styles.duration}>
              <i className={`material-icons ${styles.time}`}>access_time</i>
              <span>{durationWithHours(playlistDuration(this.props.stream.playlist.songs))}</span>
              <i className={`material-icons ${styles.queue}`}>queue_music</i>
              <span>{this.props.stream.playlist.songs.length} tracks</span>
              <i className={`material-icons ${styles[ this.state.opened ? 'opened' : 'closed']}`}>arrow_drop_down</i>
            </div>
          </div>
          <div className={styles.icons}>
            <i className={`material-icons ${styles.ripple}`} onClick={this.remove}>close</i>
          </div>
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
