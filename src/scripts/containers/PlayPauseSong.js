import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {pause} from '../actions/PlayerActions';

const mapStateToProps = (state, ownProps) => {
  return state.player ?
   {
    isPlaying:  state.player.currentSong.id &&
     state.player.currentSong.id == ownProps.songId && state.player.playing
  } : {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pause: () => dispatch(pause())
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
        <i className='material-icons' onClick={this.props.pause}>&#xE034;</i> :
        <i className='material-icons' onClick={this.props.play}>&#xE037;</i>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseSong);
