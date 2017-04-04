import React, {Component, PropTypes} from 'react';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/login.scss';

export default class Login extends Component {

  state = {error: ''};

  static propTypes = {
    authUser: PropTypes.func
  };

  render(){
    const auth = () => this.props.authUser(this.refs.email.value, this.refs.password.value)
      .catch(_e => this.setState({error: 'Incorrect email or password.'}));
    return (
      <div className={styles.root}>
        <div className={styles.signIn}>Sign in with:</div>
        <div>
          <div className={styles.input}>
            <input ref='email' required type='email' placeholder='email' />
          </div>
          <div className={styles.input}>
            <input ref='password' required type='password' placeholder='password' />
          </div>

          <div className={styles.ebArea}>
            <p className={styles.err}>{this.state.error}</p>

            <button className={styles.btn} onClick={auth}>Login</button>
          </div>
        </div>

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
