import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import QueueTab from './QueueTab'
import Player from '../containers/Player'


class App extends Component {

  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Queue</Tab>
            <Tab className='hide-on-echo'>Scan</Tab>
            <Tab>My playlists</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanel className='ls'> <QueueTab /> </TabPanel>
          <TabPanel className='hide-on-echo'>Scan</TabPanel>
          <TabPanel>My playlists</TabPanel>
          <TabPanel>History</TabPanel>
        </Tabs>

        <Player />
      </div>
    );
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
}


export default App;
