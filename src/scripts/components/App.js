import React, {Component} from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {connect} from 'react-redux';
import {Tab, Tabs} from 'react-toolbox';
import QueueTab from './QueueTab';
import MyStreams from '../containers/MyStreams';
import CurrentUser from '../containers/CurrentUser';
import Player from '../containers/Player';
import styles from '../../assets/styles/app.scss';
import tabStyles from '../../assets/styles/tabs.scss';

import * as EchoCli from '../lib/echoWebCliApi';

class App extends Component {

  state = {index: 0};

  handleTabChange = index => this.setState({index});

  unmountApp = () => EchoCli.either(EchoCli.hideRoot, () => unmountComponentAtNode(document.getElementById('echo-app-ext')));

  render() {
    return (
      <div className={styles.root}>
        <Tabs theme={tabStyles} index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Queue'> <QueueTab /> </Tab>
          <Tab label='My playlists' className='hideThisOnEchoWeb'> <MyStreams /> </Tab>
          {
//            <Tab label='Scan' className='hide-on-echo'>Scan</Tab>
//            <Tab label='My playlists'> <i className='material-icons'>&#xE84F;</i> <i className='fa fa-eercast' aria-hidden='true' /></Tab>
//            <Tab label='History'>History</Tab>
          }
        </Tabs>

        <CurrentUser />

        <Player />

        <i onClick={this.unmountApp} className={`material-icons ${styles.close}`}>&#xE5CD;</i>
      </div>
    );
  }

}


export default App;
