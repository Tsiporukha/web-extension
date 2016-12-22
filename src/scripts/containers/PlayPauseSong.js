import React, { Component } from 'react';
import { connect } from 'react-redux';
import {pause} from '../actions/PlayerActions';

const mapStateToProps = (state, ownProps) => {
  return state.player ?
   {
    isPlaing:  state.player.currentSong.id &&
     state.player.currentSong.id == ownProps.songId && state.player.playing
  } : {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    pause: () => dispatch(pause())
  }
}

class PlayPauseSong extends Component {
  render(){
    return (
      this.props.isPlaing ?
        <i className='material-icons' onClick={this.props.pause}>&#xE034;</i> :
        <i className='material-icons' onClick={this.props.play}>&#xE037;</i>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPauseSong);
