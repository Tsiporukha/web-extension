import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import QueueTab from './QueueTab'


class App extends Component {
  constructor(props) {
    super(props);
  }

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
      </div>
    );
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
}


export default App;
