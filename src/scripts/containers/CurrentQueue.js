import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeFromCurrentQueue} from '../actions/SongsActions';
import {setPlayingSong} from '../actions/PlayerActions';
import SongList from '../components/SongList';

const mapStateToProps = (state, ownProps) => {
  return {
    songs: state.currentQueue
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFromCurrentQueue: (songs) => { dispatch(removeFromCurrentQueue(songs)) },
    play: (song) => { dispatch(setPlayingSong({...song, playlist: 'currentQueue'})) }
  }
}

class CurrentQueue extends Component {
  render(){
    return (
      <div>
        {this.props.songs && <div>Current Queue: {this.props.songs.length} songs</div>}
        <button className={'btn btn-danger'} onClick={() => { this.props.removeFromCurrentQueue(this.props.songs) }}
          className={'btn btn-danger'}> remove all songs</button>
        <SongList {...this.props}/>
      </div>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentQueue);
