import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Login from './Login';

import {cleanSession} from '../actions/SessionActions';

import styles from '../../assets/styles/maybeCurrentUser.scss';
import bp from '../../assets/styles/bootstrap.css';


const mapStateToProps = store => ({
  token: store.session.token,
  currentUser: store.session.user
});

const mapDispatchToProps = dispatch => ({
  cleanSession: () => dispatch(cleanSession())
});

class MaybeCurrentUser extends Component {

  static propTypes = {
    token: PropTypes.string,
    currentUser:  PropTypes.object,

    authUser: PropTypes.func,
    cleanSession: PropTypes.func
  }

  render(){
    return (
      <div className={bp['container-fluid']}>
        {this.props.token ?
          <span className={styles.userArea}>
            <img src={this.props.currentUser.avatar_url} alt='avatar' className={styles.avatar} />
            <span className={styles.name}>{this.props.currentUser.username}</span>
            <button className={styles.logout} onClick={this.props.cleanSession}>Log Out</button>
          </span>
          :
          <div className={`${bp['col-md-offset-3']} ${bp['col-md-6']}`}>
            <Login />
          </div>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaybeCurrentUser);
