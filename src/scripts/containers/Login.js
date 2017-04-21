import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {setUserData} from '../actions/SessionActions';

import styles from '../../assets/styles/login.scss';

const iframeLoginOrigin = 'http://beta.echoapplication.com'

const mapDispatchToProps = dispatch => ({
  setUserData: userData => dispatch(setUserData(userData)),
});


class Login extends Component {

  iframeMessageListener =  e => e.origin == iframeLoginOrigin ? this.props.setUserData(e.data) : false;

  addIframeMessageListener = () => window.addEventListener('message', this.iframeMessageListener);

  state = {invalidCredentials: false};

  componentDidMount(){
    return this.addIframeMessageListener();
  }

  componentWillUnmount(){
    return window.removeEventListener('message', this.iframeMessageListener);
  }

  static propTypes = {
    authUser: PropTypes.func
  };

  render(){
    return (
      <div className={styles.root}>
        <iframe width='400' height='560' src={`${iframeLoginOrigin}/#/iframe_login`} frameBorder='0' />
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Login);
