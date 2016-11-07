import React, {Component} from 'react';
import Song from './Song';

export default class SongList extends Component {
  render() {
    return (
      <div>
        {(this.props.songs && this.props.songs.length) ?
          <div> {this.props.songs.map(song => (
            <Song
              song={song}
              key={song.id || song.uid}
              addToCurrentQueue={this.props.addToCurrentQueue}
              removeFromCurrentQueue={this.props.removeFromCurrentQueue}
            />)
          )}
          </div> :
          <div>No songs</div>
        }
      </div>
    );
  }

}
