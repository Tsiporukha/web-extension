import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeFromCurrentQueue} from '../actions/SongsActions';
import {setPlayingSong, play, clean as cleanPlayer} from '../actions/PlayerActions';
import SongList from '../components/SongList';
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
    removeFromCurrentQueue: (songs) => { dispatch(removeFromCurrentQueue(songs)) },
    play: (song) => {
      dispatch(setPlayingSong({...song, playlist: 'currentQueue'}));
      dispatch(play());
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
      <div>
        {this.props.songs && <div>Current Queue: {this.props.songs.length} songs, {queueDuration}</div>}
        <button className={'btn btn-danger'} className={'btn btn-danger'}
          onClick={() => { this.props.cleanCurrentQueue(this.props.songs, this.props.isQueuePlaying) }}> remove all songs</button>
        <SongList {...this.props}/>
      </div>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentQueue);
