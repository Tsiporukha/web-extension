import React, {Component} from 'react';
import {duration} from '../lib/duration';

export default class Song extends Component {

  render() {
    return (
      <div className='row'>
        <img src={this.props.song.artwork_url} style={{height: '180px'}} />
        artist: {this.props.song.artist},
        title: {this.props.song.title},
        source: {this.props.song.source},
        duration: {duration(this.props.song.duration)}
        {this.props.addToCurrentQueue &&
          <button className={'btn btn-success'} onClick={() => this.props.addToCurrentQueue([this.props.song])}>addToCurrentQueue</button> }
        {this.props.removeFromCurrentQueue &&
          <button className={'btn btn-danger'} onClick={() => this.props.removeFromCurrentQueue([this.props.song])}>removeFromCurrentQueue</button> }
        {this.props.play &&
          <button className={'btn btn-success'} onClick={() => this.props.play(this.props.song)}>play</button> }
        </div>
    );
  }

}
