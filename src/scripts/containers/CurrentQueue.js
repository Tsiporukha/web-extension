import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {removeFromCurrentQueue} from '../actions/SongsActions';
import {setPlayingSong, play, clean as cleanPlayer} from '../actions/PlayerActions';
import SongList from '../components/SongList';
import styles from '../../assets/styles/queue.scss';

import {withHours as durationWithHours} from '../lib/duration';
import * as EchoCli from '../lib/echoWebCliApi';
import {sumBy, flowRight} from 'lodash';

const mapStateToProps = (state, ownProps) => {
  return state.player ?
   {
    songs: state.currentQueue,
    isQueuePlaying: state.player.currentSong.playlist == 'currentQueue'
  } : {}
}

const mapDispatchToProps = (dispatch, ownProps) => {

  /**
   * Remove passed songs from current queue
   * @param  {array} songs - songs for removing
   * @return {array}       removed songs
   */
  const _removeFromCurrentQueue = songs => {
    dispatch(removeFromCurrentQueue(songs));
    return EchoCli.either(() => EchoCli.updatePlaylistSongs('currentQueue'));
  }

  const _play = song => dispatch(setPlayingSong(song)).then(() => dispatch(play()));


  const echoCli = {
    play: song => EchoCli.playSongFrom('currentQueue', song)
  }


  return {
    removeFromCurrentQueue: _removeFromCurrentQueue,

    play: EchoCli.either(() => echoCli.play, () => _play),

    /**
     * Remove passed songs from current queue.
     * Stop Player if playing playlist is current queue
     * @param  {array} songs - songs for removing. Should be all songs from current queue
     * @param  {Boolean} isQueuePlaying - is current queue playing
     * @return {array}       removed songs
     */
    cleanCurrentQueue: (songs, isQueuePlaying) => {
      if(isQueuePlaying) dispatch(cleanPlayer());
      return _removeFromCurrentQueue(songs);
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

    /**
     * removes all songs from current queue
     * @return {array} removed songs
     */
    const clearQueue = () => this.props.cleanCurrentQueue(this.props.songs, this.props.isQueuePlaying);

    return (
      <div className={`${styles.queue} h100perc`}>
        {this.props.songs && <div className={`${styles.cqHeader}`}>
          <span className={styles.cqInfo}>
            YOUR QUEUE: <b>{this.props.songs.length} songs, {queueDuration}</b>
            <i className='material-icons' onClick={clearQueue}>clear_all</i>
            <i className='material-icons' onClick={() => EchoCli.either((() => EchoCli.playQueue(this.props.songs, 0)))}>add</i>
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
