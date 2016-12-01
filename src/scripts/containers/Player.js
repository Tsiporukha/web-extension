import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux';

import {play, pause, setVolume, setProgress, playNextSong, playPrevSong} from '../actions/PlayerActions'

const mapStateToProps = (state, ownProps) => {
  return state.player ?
    {
      playingSong: state.player.currentSong,
      playing: state.player.playing,
      volume: state.player.volume,
      played: state.player.played
    } : {played: 0, volume: 80, playingSong: {}}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: () => { dispatch(play()) },
    next: (currentSong, playlistPath) => { dispatch(playNextSong(currentSong, playlistPath)) },
    prev: (currentSong, playlistPath) => { dispatch(playPrevSong(currentSong, playlistPath)) },
    pause: () => { dispatch(pause()) },
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


  componentDidMount(){
  }

  render () {
    return (
      <div style={{position: 'fixed', bottom: '0px', backgroundColor: 'cadetblue',
        visibility: this.props.playingSong.data_url ? 'visible' : 'hidden' }}>
        <ReactPlayer
          ref={player => { this.player = player }}
          className='react-player'
          width={240}
          height={135}
          url={this.props.playingSong.data_url}
          playing={this.props.playing}
          volume={this.props.volume}
          onProgress={this.onProgress}
          onEnded={() => { this.props.next(this.props.playingSong, this.props.playingSong.playlist) }}
          onDuration={duration => {console.log(duration)}}
        />
        {this.props.playing ?
          <button className={'btn btn-warning'} onClick={this.props.pause}>pause</button> :
          <button className={'btn btn-success'} onClick={this.props.play}>play</button>
        }
        <button onClick={e => {this.props.prev(this.props.playingSong, this.props.playingSong.playlist)}}
          className={'btn btn-info'}>prev</button>
        <button onClick={e => {this.props.next(this.props.playingSong, this.props.playingSong.playlist)}}
          className={'btn btn-info'}>next</button>
        volume
        <input type='range' min={0} max={1} step='any' value={this.props.volume} onChange={this.props.setVolume} />
        progress
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
