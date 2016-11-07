import React, {Component} from 'react';
import SongList from './SongList';
import SearchQueue from '../containers/SearchQueue';
import CurrentQueue from '../containers/CurrentQueue';

export default class QueueTab extends Component {
  render() {
    return (
      <div className='container'>
        <div className="col-md-offset-1 col-md-5">
          <SearchQueue />
        </div>
        <div className="col-md-5">
          <CurrentQueue />
        </div>
      </div>
    );
  }
}
