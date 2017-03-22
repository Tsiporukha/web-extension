import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';

import {authUser, cleanSession} from '../actions/SessionActions';

import bp from '../../assets/styles/bootstrap.css';


const mapStateToProps = store => ({
  token: store.session.token,
  currentUser: store.session.user
});

const mapDispatchToProps = dispatch => ({
  authUser: (email, password) => dispatch(authUser(email, password)),
  cleanSession: () => dispatch(cleanSession())
})

class MaybeCurrentUser extends Component {

  static propTypes = {
    token: PropTypes.string,
    currentUser:  PropTypes.object,

    authUser: PropTypes.func,
    cleanSession: PropTypes.func
  }

  render(){
    return (
      this.props.token ?
        <span>
          <img src={this.props.currentUser.avatar_url} alt='avatar' style={{height: '60px', width: '60px'}} />
          <button onClick={this.props.cleanSession}>Logout</button>
        </span>
        :
        <Login authUser={this.props.authUser} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaybeCurrentUser);
