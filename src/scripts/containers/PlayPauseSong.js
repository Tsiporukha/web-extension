import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {pause} from '../actions/PlayerActions';
import * as EchoCli from '../lib/echoWebCliApi';

const mapStateToProps = (state, ownProps) => ({
  isPlaying: state.player.playing && !!state.player.currentSong.id &&
   state.player.currentSong.id == ownProps.songId
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pause: () => {
      EchoCli.either(EchoCli.pause);
      return  dispatch(pause());
    }
  }
}

class PlayPauseSong extends Component {

  static propTypes = {
    isPlaying: PropTypes.bool,

    pause: PropTypes.func,
    play: PropTypes.func,
  }

  render(){
    return (
      this.props.isPlaying ?
        <i className='material-icons' onClick={this.props.pause}>pause</i> :
        <i className='material-icons' onClick={this.props.play}>play_arrow</i>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseSong);
