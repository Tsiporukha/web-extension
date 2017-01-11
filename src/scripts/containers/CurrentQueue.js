import React, { Component, PropTypes } from 'react';
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
      return dispatch(setPlayingSong({...song, playlist: 'currentQueue'}))
        .then(() => dispatch(play()));
    },
    cleanCurrentQueue: (songs, isQueuePlaying) => {
      if(isQueuePlaying) dispatch(cleanPlayer());
      return dispatch(removeFromCurrentQueue(songs));
    }
  }
}

class CurrentQueue extends Component {

  static propTypes = {
    songs: PropTypes.array,
    isQueuePlaying: PropTypes.bool,

    cleanCurrentQueue: PropTypes.func,
    play: PropTypes.func,
    removeFromCurrentQueue: PropTypes.func
  }


  render(){
    const queueDuration = flowRight([durationWithHours, sumBy])(this.props.songs, 'duration');
    return (
      <div className={`${styles.queue} h100perc`}>
        {this.props.songs && <div className={`${styles.cqHeader}`}>
          <span className={styles.cqInfo}>
            YOUR QUEUE: <b>{this.props.songs.length} songs, {queueDuration}</b>
            <i className='material-icons'
              onClick={() => this.props.cleanCurrentQueue(this.props.songs, this.props.isQueuePlaying)}>clear_all</i>
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
