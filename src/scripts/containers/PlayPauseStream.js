import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {pause, play} from '../actions/PlayerActions';
import {addToCurrentQueueTopAndPlay} from '../actions/SongsActions';

import * as EchoCli from '../lib/echoWebCliApi';

const mapStateToProps = (state, ownProps) => ({
  isPlaying: state.player.playing && !!state.player.currentSong.id && ownProps.songs.some(sng => sng.id == state.player.currentSong.id),
  currentSongId: state.player.currentSong.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  pause: () => {
    EchoCli.either(EchoCli.pause);
    return  dispatch(pause());
  },
  play: currentSongId => () =>
    ownProps.songs.some(sng => sng.id == currentSongId) ? dispatch(play()) : dispatch(addToCurrentQueueTopAndPlay(ownProps.songs))
})

class PlayPauseStream extends Component {

  static propTypes = {
    isPlaying: PropTypes.bool,

    pause: PropTypes.func,
    play: PropTypes.func,
  }

  render(){
    return (
      this.props.isPlaying ?
        <i className='material-icons' onClick={this.props.pause}>pause</i> :
        <i className='material-icons' onClick={this.props.play(this.props.currentSongId)}>play_arrow</i>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseStream);
