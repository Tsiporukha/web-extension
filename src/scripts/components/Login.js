import React, {Component, PropTypes} from 'react';

export default class Login extends Component {

  state = {error: ''};

  static propTypes = {
    authUser: PropTypes.func
  };

  render(){
    const auth = () => this.props.authUser(this.refs.email.value, this.refs.password.value)
      .catch(_e => this.setState({error: 'invalid'}));
    return (
      <span style={{textAlign: 'center', color: 'white'}}>
        <input placeholder='email' type='email' ref='email' /><br />
        <input placeholder='password' type='password' ref='password' />
        <button onClick={auth}>Login</button>
        {this.state.error}
      </span>
    );
  }

}
