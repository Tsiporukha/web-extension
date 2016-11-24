import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux';

import {play, pause, setPlayingSong, setVolume, setProgress} from '../actions/PlayerActions'

const mapStateToProps = (state, ownProps) => {
  return {
    playingSong: state.player.currentSong,
    playing: state.player.playing,
    volume: state.player.volume,
    played: state.player.played
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: () => { dispatch(play()) },
    pause: () => { dispatch(pause()) },
    setPlayingSong: (song) => { dispatch(setPlayingSong(song)) },
    setVolume: (e) => { dispatch(setVolume(parseFloat(e.target.value))) },
    setProgress: (progress) => { dispatch(setProgress(progress)) }
  }
}

class Player extends Component {

  state = {seeking: false};

  onSeekMouseDown = e => { this.setState({ seeking: true }) };

  onSeekMouseUp = e => {
    this.player.seekTo(parseFloat(e.target.value))
    this.setState({ seeking: false })
  };

  onProgress = progress => { if(!this.state.seeking) this.props.setProgress(progress) };

  render () {
    return (
      <div>
        <ReactPlayer
          ref={player => { this.player = player }}
          className='react-player'
          width={480}
          height={270}
          url={this.props.playingSong.data_url}
          playing={this.props.playing}
          volume={this.props.volume}
          onProgress={this.onProgress}
          onDuration={duration => {console.log(duration)}}
        />
        <button onClick={this.props.pause}>pause</button>
        <button onClick={this.props.play}>play</button>
        <input type='range' min={0} max={1} step='any' value={this.props.volume} onChange={this.props.setVolume} />
        <input type='range' min={0} max={1} step='any' value={this.props.played}
          onMouseDown={this.onSeekMouseDown}
          onMouseUp={this.onSeekMouseUp}
          onChange={e => { this.props.setProgress({played: parseFloat(e.target.value)}) }}/>
      </div>
    )
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
