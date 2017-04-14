import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {authUser} from '../actions/SessionActions';

import styles from '../../assets/styles/login.scss';


const mapDispatchToProps = dispatch => ({
  authUser: (email, password) => dispatch(authUser(email, password))
});


class Login extends Component {

  state = {invalidCredentials: false};

  static propTypes = {
    authUser: PropTypes.func
  };

  render(){
    const auth = () => this.props.authUser(this.refs.email.value, this.refs.password.value)
      .catch(_e => this.setState({invalidCredentials: true}));

    const onSubmit = e => Promise.resolve(e.preventDefault()).then(auth);

    return (
      <div className={styles.root}>
        <div className={styles.signIn}>Sign in with:</div>
        <form onSubmit={onSubmit}>
          <div className={styles.input}>
            <input ref='email' required type='email' placeholder='email' />
          </div>
          <div className={styles.input}>
            <input ref='password' required type='password' placeholder='password' />
          </div>

          <div className={styles.ebArea}>
            {this.state.invalidCredentials && <p className={styles.err}>Incorrect email or password.</p>}

            <button type='submit' className={styles.btn}>Login</button>
          </div>
        </form>

        <div className={styles.mobileArea}>
          <div>
            <b>Need an account?</b><br />
            Download the app to sign up:
          </div>

          <div className={styles.btns}>
            <a href='https://itunes.apple.com/us/app/echo-sync-your-devices-in/id772203328?mt=8' target='_blank'>
              <button className={styles.btn}>
                <span className={styles.firstLine}>Download on the</span><br />
                <span className={styles.secondLine}>App Store</span>
              </button>
            </a>
            <a href='http://play.google.com/store/apps/details?id=com.echo.app' target='_blank'>
              <button className={styles.btn}>
                <span className={styles.firstLine}>Get it on</span><br />
                <span className={styles.secondLine}>Google Play</span>
              </button>
            </a>

          </div>

        </div>
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(Login);
