import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import Slider from 'react-toolbox/lib/slider';
import {play, pause, setVolume, setProgress, playNextSong, playPrevSong, clean} from '../actions/PlayerActions'
import {removeFromCurrentQueue} from '../actions/SongsActions';
import {duration} from '../lib/duration';
import styles from '../../assets/styles/player.scss';

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
//    setVolume: (e) => { dispatch(setVolume(parseFloat(e.target.value))) },
    setVolume: (value) => dispatch(setVolume(value)),
    setProgress: (progress) => { dispatch(setProgress(progress)) },
    removeFromCurrentQueue: song => {
      dispatch(playNextSong(song, song.playlist)).then(newCurSong => {
        dispatch(removeFromCurrentQueue([song]));
        if(newCurSong.id == song.id) dispatch(clean());
      });
    }
  }
}

class Player extends Component {

  state = {seeking: false, duration: 0};

  onSeekMouseDown = e => { this.setState({ seeking: true }) };

  onProgress = progress => { if(!this.state.seeking) this.props.setProgress(progress) };

  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  syncPlayer = () => {
    const wasPlaying = this.props.playing;
    this.player.seekTo(this.props.played);
    this.props.play();
    if(!wasPlaying) this.props.pause();
//    this.player.player.player.a.id = 'ytPlayer';
  };

  componentDidMount(){
  }

  render () {
    return (
      <div className={styles["bottom-player"]} style={{visibility: this.props.playingSong.data_url ? 'visible' : 'hidden' }}>
        <div className={styles["cover"]}>
      		<img src={this.props.playingSong.artwork_url} className={styles["cover"]}/>
      	</div>
      	<div className={styles["song-info"]} >
      		<h5>{this.props.playingSong.artist}</h5>
      		<h6>{this.props.playingSong.title}</h6>
      	</div>
        <i onClick={e => {this.props.prev(this.props.playingSong, this.props.playingSong.playlist)}}
          className="material-icons">&#xE045;</i>
        {this.props.playing ?
      	  <i className={`material-icons ${styles['mi-bpause']}`} onClick={this.props.pause}>&#xE034;</i> :
	        <i className={`material-icons ${styles['mi-bpause']}`} onClick={this.props.play}>&#xE037;</i>
        }
      	<i onClick={e => {this.props.next(this.props.playingSong, this.props.playingSong.playlist)}}
          className="material-icons">&#xE044;</i>

        <i className="material-icons">&#xE04D;</i>
      	<div className={styles["player-volume"]}> <Slider min={0} max={1} value={this.props.volume} onChange={this.props.setVolume} /> </div>
        {duration(this.state.duration * this.props.played)}
      	<div className={styles["song-progress"]} >
          <input type='range' step='any'  min={0} max={1} value={this.props.played}
             onMouseUp={this.onSeekMouseUp}
             onMouseDown={this.onSeekMouseDown}
             onChange={e => { this.props.setProgress({played: parseFloat(e.target.value)}) }}/>
        </div>
        {duration(this.state.duration *(1 - this.props.played))}
        {this.props.playingSong.playlist == 'currentQueue' && <i className="material-icons"
          onClick={() => this.props.removeFromCurrentQueue(this.props.playingSong)}>close</i>}

        <ReactPlayer
          ref={player => { this.player = player }}
          className={styles.reactPlayer}
          width={240}
          height={135}
          url={this.props.playingSong.data_url}
          playing={this.props.playing}
          volume={this.props.volume}
          onProgress={this.onProgress}
          onEnded={() => { this.props.next(this.props.playingSong, this.props.playingSong.playlist) }}
          onReady={this.syncPlayer}
          onDuration={duration => { this.setState({ duration }) }}
        />
      </div>
    )
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
