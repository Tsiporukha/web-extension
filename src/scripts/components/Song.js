import React, {Component, PropTypes} from 'react';
import PlayPauseSong from '../containers/PlayPauseSong';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/song.scss';

import {duration} from '../lib/duration';

export default class Song extends Component {

  static propTypes = {
    type: PropTypes.string,
    song: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      artist: PropTypes.string,
      artwork_url: PropTypes.string,
      duration: PropTypes.number
    }),

    addToCurrentQueue: PropTypes.func,
    play: PropTypes.func,
    remove: PropTypes.func
  }

  render() {
    return (
      <div className={`${bp.row} no-margin ${styles[this.props.type]}`}>
        <div className={`${bp['col-xs-1']} ${styles.artwork}`}>
          <img src={this.props.song.artwork_url} />
          <span className={styles.playPause}>
            <PlayPauseSong songId={this.props.song.id} play={() => this.props.play(this.props.song)} />
          </span>
        </div>
        <div className={`${bp['col-xs-1']} ${styles.content}`}>
          <div className={`${bp.row} no-margin ${styles.title}`}>{this.props.song.title}</div>
          <div className={`${bp.row} no-margin ${styles.artist}`}>{this.props.song.artist}</div>
          <div className={`${bp.row} no-margin ${styles.duration}`}>{duration(this.props.song.duration)}</div>
        </div>
        <div className={`${bp['col-xs-1']} no-padding ${styles.icons}`}>
          {this.props.addToCurrentQueue && <i className={`material-icons pull-right ${styles.ripple}`}
            onClick={() => this.props.addToCurrentQueue([this.props.song])}>add</i> }
          {this.props.remove && <i className={`material-icons pull-right ${styles.ripple}`}
            onClick={() => this.props.remove([this.props.song])}>close</i>}
        </div>
      </div>
    );
  }

}
