import React, {Component} from 'react';
import SongList from './SongList';
import SearchQueue from '../containers/SearchQueue';
import CurrentQueue from '../containers/CurrentQueue';

import bp from '../../assets/styles/bootstrap.css';

export default class QueueTab extends Component {
  render() {
    return (
      <div className={`${bp['container-fluid']} h100perc no-margin no-padding`}>
        <div className={`${bp['col-xs-8']} h100perc no-padding`}>
          <SearchQueue />
        </div>
        <div className={`${bp['col-xs-4']} h100perc no-padding`}>
          <CurrentQueue />
        </div>
      </div>
    );
  }
}
