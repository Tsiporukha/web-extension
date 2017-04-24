import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Login from './Login';

import {cleanSession} from '../actions/SessionActions';

import * as EchoCli from '../lib/echoWebCliApi';

import styles from '../../assets/styles/maybeCurrentUser.scss';
import bp from '../../assets/styles/bootstrap.css';


const mapStateToProps = store => ({
  token: store.session.token,
  currentUser: store.session.user
});

const mapDispatchToProps = dispatch => ({
  cleanSession: () => dispatch(cleanSession())
});

class CurrentUser extends Component {

  static propTypes = {
    token: PropTypes.string,
    currentUser:  PropTypes.object,

    cleanSession: PropTypes.func
  }

  render(){

    const maybeGoToUser = userId => () => EchoCli.maybe(() => EchoCli.goToPath(`/profile/${userId}`));

    return (
      this.props.token ?
        <span className={styles.userArea}>
          <a onClick={maybeGoToUser(this.props.currentUser.id)}>
            <img src={this.props.currentUser.avatar_url} alt='avatar' className={styles.avatar} />
            <span className={styles.name}>{this.props.currentUser.username}</span>
          </a>
          <button className={styles.logout} onClick={this.props.cleanSession}>Log Out</button>
        </span>
        :
        false
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
