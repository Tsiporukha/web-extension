import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tab, Tabs} from 'react-toolbox';
import QueueTab from './QueueTab';
import Player from '../containers/Player';
import styles from '../../assets/styles/app.css';

class App extends Component {

  state = {index: 0};

  handleTabChange = (index) => {
    this.setState({index});
  };

  render() {
    return (
      <div className={styles.fade}>
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Queue'> <QueueTab /> </Tab>
          <Tab label='Secondary' className='hide-on-echo'>Scan</Tab>
          <Tab label='My playlists'></Tab>
          <Tab label='History'><small>Fourth content hidden</small></Tab>
        </Tabs>

        <Player />
      </div>
    );
  }

}


export default App;
