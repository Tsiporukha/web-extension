import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeFromCurrentQueue} from '../actions/SongsActions';
import {setPlayingSong, play, clean as cleanPlayer} from '../actions/PlayerActions';
import SongList from '../components/SongList';
import styles from '../../assets/styles/queue.scss';

import {withHours as durationWithHours} from '../lib/duration';
import {sumBy, flowRight} from 'lodash';

const mapStateToProps = (state, ownProps) => {
  return state.player ?
   {
    songs: state.currentQueue,
    isQueuePlaying: state.player.currentSong.playlist == 'currentQueue'
  } : {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFromCurrentQueue: (songs) => dispatch(removeFromCurrentQueue(songs)),
    play: (song) => {
      dispatch(setPlayingSong({...song, playlist: 'currentQueue'}));
      return dispatch(play());
    },
    cleanCurrentQueue: (songs, isQueuePlaying) => {
      dispatch(removeFromCurrentQueue(songs));
      if(isQueuePlaying) dispatch(cleanPlayer());
    }
  }
}

class CurrentQueue extends Component {
  render(){
    const queueDuration = flowRight([durationWithHours, sumBy])(this.props.songs, 'duration');
    return (
      <div className={`${styles.queue} h100perc`}>
        {this.props.songs && <div className={`${styles.header}`}>
          <span className={styles.cqInfo}>
            YOUR QUEUE: <b>{this.props.songs.length} songs, {queueDuration}</b>
            <i className='material-icons'
              onClick={() => this.props.cleanCurrentQueue(this.props.songs, this.props.isQueuePlaying)}>&#xE5CD;</i>
            <i className='material-icons'>add</i>
          </span>
        </div>}
        <div className={`${styles.songList} ${styles.current}`}>
          <SongList {...this.props} />
        </div>
      </div>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentQueue);
