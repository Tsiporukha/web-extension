import React, {Component, PropTypes} from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import Slider from 'react-toolbox/lib/slider';
import {play, pause, setVolume, setProgress, playNextSong, playPrevSong, clean,
  seekTo, setSeeking} from '../actions/PlayerActions';
import {removeFromCurrentQueue} from '../actions/SongsActions';
import {duration} from '../lib/duration';
import styles from '../../assets/styles/player.scss';
import bp from '../../assets/styles/bootstrap.css';
import sliderStyles from '../../assets/styles/slider.scss';
import CurrentQueue from './CurrentQueue';

const mapStateToProps = state => ({
  playingSong: state.player.currentSong,
  playing: state.player.playing,
  volume: state.player.volume,
  played: state.player.played,
  seeking: state.player.seeking
});

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
        return newCurSong;
      });
    },
    seekTo: val => dispatch(seekTo(val)),
    setSeeking: bool => dispatch(setSeeking(bool))
  }
}

class Player extends Component {

  static propTypes = {
    playingSong: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      artist: PropTypes.string,
      artwork_url: PropTypes.string,
      data_url: PropTypes.string,
      duration: PropTypes.number,
      playlist: PropTypes.string
    }),
    seeking: PropTypes.bool,
    isQueuePlaying: PropTypes.bool,
    playing: PropTypes.bool,
    played: PropTypes.number,
    volume:  PropTypes.number,

    play: PropTypes.func,
    pause: PropTypes.func,
    prev: PropTypes.func,
    next: PropTypes.func,
    setVolume: PropTypes.func,
    setProgress: PropTypes.func,
    setSeeking: PropTypes.func,
    seekTo: PropTypes.func
  }


  state = {duration: 0, tracklistOpened: false};

  // ReactPlayer
  //
  /**
   * callback for onProgress event
   * @param  {hash} progress - played and loaded progress as fraction,
   * eg {played: 0.12, loaded: 0.34}
   * @return {[type]}          update progress state if not seeking
   */
  onProgress = progress => this.props.seeking ? false : this.props.setProgress(progress);

  /**
   * synchronize ReactPlayer with current state
   * @return {[type]} [description]
  */
  syncPlayer = () => {
    const wasPlaying = this.props.playing;
    this.player.seekTo(this.props.played);
    this.props.play();
    if(!wasPlaying) this.props.pause();
    return true;
//    this.player.player.player.a.id = 'ytPlayer';
  };

  // songProgress
  onSeekMouseDown = e => this.props.setSeeking(true);

  onSeekMouseUp = e => {
    this.props.setSeeking(false);
    return this.props.seekTo(this.props.played);
  };


  // playing queue
  toggleTracklistOpened = () => this.setState({tracklistOpened: !this.state.tracklistOpened})

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
          <Slider min={0} max={1} theme={sliderStyles} className={`${styles}`} value={this.props.volume} onChange={this.props.setVolume} />
        </div>

        <span>{duration(this.props.playingSong.duration * this.props.played)}</span>
        <div className={`${styles.songProgress}`} onMouseUp={this.onSeekMouseUp}>
          <Slider theme={sliderStyles} min={0} max={1} value={this.props.played}
            onChange={val => {
              this.props.setSeeking(true);
              return this.props.setProgress({played: val});
            }} />
        </div>
        <span>{duration(this.props.playingSong.duration * (1 - this.props.played))}</span>

        <i className={`material-icons ${this.state.tracklistOpened? styles.currentQueueIconActive : styles.currentQueueIcon}`}
          onClick={this.toggleTracklistOpened}>queue_music</i>

        {!window.HIDE_ER_PLAYER && !window.echoApi &&
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

        {this.state.tracklistOpened && <div className={`${bp['col-xs-3']} ${styles.currentQueue}`}> <CurrentQueue /></div>}
      </div>
    )
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
