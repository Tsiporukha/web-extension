import React, {Component} from 'react';
import PlayPauseSong from '../containers/PlayPauseSong';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/song.scss';

import {duration} from '../lib/duration';

export default class Song extends Component {

  render() {
    return (
      <div className={`${bp.row} no-margin`}>
        <div className={`${bp['col-xs-1']} no-padding ${styles.artwork}`}>
          <img src={this.props.song.artwork_url} />
          <span className={styles.playPause}>
            <PlayPauseSong songId={this.props.song.id} play={() => this.props.play(this.props.song)}/>
          </span>
        </div>
        <div className={`${bp['col-xs-1']} ${styles.content}`}>
          <div className={`${bp.row} no-margin ${styles.title}`}>{this.props.song.title}</div>
          <div className={`${bp.row} no-margin`}>{this.props.song.artist}</div>
          <div className={`${bp.row} no-margin ${styles.duration}`}>{duration(this.props.song.duration)}</div>
        </div>
        <div className={`${bp['col-xs-1']} no-padding ${styles.icons}`}>
          {this.props.addToCurrentQueue && <i className="material-icons pull-right"
            onClick={() => this.props.addToCurrentQueue([this.props.song])}>&#xE145;</i> }
          {this.props.removeFromCurrentQueue && <i className="material-icons pull-right"
            onClick={() => this.props.removeFromCurrentQueue([this.props.song])}>&#xE5CD;</i> }
        </div>
      </div>
    );
  }

}
