import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import Slider from 'react-toolbox/lib/slider';
import {play, pause, setVolume, setProgress, playNextSong, playPrevSong, clean,
  seekTo, setSeeking} from '../actions/PlayerActions';
import {removeFromCurrentQueue} from '../actions/SongsActions';
import {duration} from '../lib/duration';
import styles from '../../assets/styles/player.scss';

const mapStateToProps = (state, ownProps) => {
  return state.player ?
    {
      playingSong: state.player.currentSong,
      playing: state.player.playing,
      volume: state.player.volume,
      played: state.player.played,
      seeking: state.player.seeking
    } : {played: 0, volume: 80, playingSong: {duration: 0}, seeking: false}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    play: () => dispatch(play()),
    next: (currentSong, playlistPath) => dispatch(playNextSong(currentSong, playlistPath)),
    prev: (currentSong, playlistPath) => dispatch(playPrevSong(currentSong, playlistPath)),
    pause: () => dispatch(pause()),
    setVolume: (value) => dispatch(setVolume(value)),
    setProgress: (progress) => dispatch(setProgress(progress)),
    removeFromCurrentQueue: song => {
      return dispatch(playNextSong(song, song.playlist)).then(newCurSong => {
        dispatch(removeFromCurrentQueue([song]));
        if(newCurSong.id == song.id) dispatch(clean());
      });
    },
    seekTo: val => dispatch(seekTo(val)),
    setSeeking: bool => dispatch(setSeeking(bool))
  }
}

class Player extends Component {

  state = {duration: 0};

  onProgress = progress => { console.log(this.props.seeking); if(!this.props.seeking) this.props.setProgress(progress) };


  onSeekMouseDown = e => this.props.setSeeking(true);

  onSeekMouseUp = e => {
    this.props.setSeeking(false);
    return this.props.seekTo(this.props.played);
  };

  syncPlayer = () => {
    const wasPlaying = this.props.playing;
    this.player.seekTo(this.props.played);
    this.props.play();
    if(!wasPlaying) this.props.pause();
//    this.player.player.player.a.id = 'ytPlayer';
  };

  render () {
    return (
      <div className={styles["bottom-player"]} style={{visibility: this.props.playingSong.data_url ? 'visible' : 'hidden' }}>

        <div className={styles["cover"]}>
          <img src={this.props.playingSong.artwork_url} className={styles["cover"]} />
        </div>

        <div className={styles.songInfo}>
          <h5>{this.props.playingSong.title}</h5>
          <h6>by {this.props.playingSong.artist}</h6>
        </div>

        <i onClick={e => this.props.prev(this.props.playingSong, this.props.playingSong.playlist)}
          className={`material-icons ${styles.prev}`}>skip_previous</i>
        {this.props.playing ?
          <i className={`material-icons ${styles.pause}`} onClick={this.props.pause}>pause</i> :
          <i className={`material-icons ${styles.play}`} onClick={this.props.play}>play_arrow</i>
        }
        <i onClick={e => this.props.next(this.props.playingSong, this.props.playingSong.playlist)}
          className={`material-icons ${styles.next}`}>skip_next</i>

        <i className={`material-icons ${styles.volumeIcon}`}>volume_down</i>
        <div className={styles.playerVolume}>
          <Slider min={0} max={1} className={`${styles}`} value={this.props.volume} onChange={this.props.setVolume} />
        </div>

        {duration(this.props.playingSong.duration * this.props.played)}
        <div className={`${styles.songProgress}`} onMouseUp={this.onSeekMouseUp}>
          <Slider className={`${styles.slider}`} min={0} max={1} value={this.props.played}
            onChange={val => {
              this.props.setSeeking(true);
              return this.props.setProgress({played: val});
            }} />
        </div>
        {duration(this.props.playingSong.duration * (1 - this.props.played))}

        <i className={`material-icons ${styles.currentQueueIcon}`}>queue_music</i>

        {window.ONLY_IN_BG &&
        <ReactPlayer
          ref={player =>  window.bgReactPlayer = this.player = player}
          className={styles.reactPlayer}
          width={240}
          height={135}
          url={this.props.playingSong.data_url}
          playing={this.props.playing}
          volume={this.props.volume}
          onProgress={this.onProgress}
          onEnded={() => this.props.next(this.props.playingSong, this.props.playingSong.playlist)}
          onReady={this.syncPlayer}
          onDuration={duration => this.setState({ duration })}
        />}
      </div>
    )
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
