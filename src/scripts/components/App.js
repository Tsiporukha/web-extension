import React, {Component} from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {connect} from 'react-redux';
import {Tab, Tabs} from 'react-toolbox';
import QueueTab from './QueueTab';
import Player from '../containers/Player';
import styles from '../../assets/styles/app.scss';
import tabStyles from '../../assets/styles/tabs.scss';

class App extends Component {

  state = {index: 0};

  handleTabChange = index => this.setState({index});

  unmountApp = () => unmountComponentAtNode(document.getElementById('echo-app-ext'));

  render() {
    return (
      <div className={styles.root}>

        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&amp;subset=cyrillic-ext,greek-ext,latin-ext,vietnamese' rel='stylesheet' />
        <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' />

        <Tabs theme={tabStyles} index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Queue'> <QueueTab /> </Tab>
          {
//            <Tab label='Scan' className='hide-on-echo'>Scan</Tab>
//            <Tab label='My playlists'> <i className='material-icons'>&#xE84F;</i> <i className='fa fa-eercast' aria-hidden='true' /></Tab>
//            <Tab label='History'>History</Tab>
          }
        </Tabs>

        <Player />

        <i onClick={this.unmountApp} className={`material-icons ${styles.close}`}>&#xE5CD;</i>
      </div>
    );
  }

}


export default App;
