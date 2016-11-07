import React, {Component} from 'react';


export default class Song extends Component {

  render() {
    return (
      <div className='row'>
        <img src={this.props.song.artwork_url} style={{height: '180px'}} />
        artist: {this.props.song.artist},
        title: {this.props.song.title},
        source: {this.props.song.source},
        duration: {this.props.song.duration}
        {this.props.addToCurrentQueue &&
          <button className={'btn btn-success'} onClick={() => this.props.addToCurrentQueue([this.props.song])}>addToCurrentQueue</button> }
        {this.props.removeFromCurrentQueue &&
          <button className={'btn btn-danger'} onClick={() => this.props.removeFromCurrentQueue([this.props.song])}>removeFromCurrentQueue</button> }
      </div>
    );
  }

}
