import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Login from './Login';
import StreamPublication from '../components/StreamPublication';

import Dialog from 'react-toolbox/lib/dialog';

import * as EchoCli from '../lib/echoWebCliApi';

import {uploadArtwork, create as createStream} from '../actions/StreamsActions';
import {setUserData} from '../actions/SessionActions';


import dialogTheme from '../../assets/styles/streamPublicationDialogTheme.scss';

const mapStateToProps = (state, ownProps) => ({
  songs: state.currentQueue,
  authed: !!state.session.token
})

const mapDispatchToProps = dispatch => ({
  uploadArtwork: image => callback =>
    Promise.resolve(onReaderLoad(e => dispatch(uploadArtwork(e.target.result, image.name)).then(callback), convertToBase64Url(image))),
  createStream: (playlist_title, tags, default_artwork_url, songs) => dispatch(createStream(playlist_title, tags, default_artwork_url, songs)),
  setUserData: userData => dispatch(setUserData(userData))
});

class streamPublicationDialog extends Component {

  static propTypes = {
  }

  componentWillReceiveProps(nextProps){
    return nextProps.visible ? EchoCli.maybe(() => this.props.setUserData(EchoCli.getSession())) : false;
  }

  render() {
    return(
      <Dialog
        active={this.props.visible}
        theme={dialogTheme}
        onEscKeyDown={this.props.toggleVisibility}
      >
        {this.props.authed ? <StreamPublication {...this.props} /> : <Login />}
      </Dialog>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(streamPublicationDialog);
