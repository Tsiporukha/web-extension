import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Login from './Login';
import StreamPublication from '../components/StreamPublication';
import SavedStreamSnackbar from '../components/SavedStreamSnackbar';

import Dialog from 'react-toolbox/lib/dialog';

import * as EchoCli from '../lib/echoWebCliApi';

import {uploadArtwork, create as createStream} from '../actions/StreamsActions';
import {maybeSetEchoCliSession} from '../actions/SessionActions';


import dialogTheme from '../../assets/styles/streamPublicationDialogTheme.scss';

const mapStateToProps = (state, ownProps) => ({
  songs: state.currentQueue,
  authed: !!state.session.token
})

const mapDispatchToProps = dispatch => ({
  uploadArtwork: image => callback =>
    Promise.resolve(onReaderLoad(e => dispatch(uploadArtwork(e.target.result, image.name)).then(callback), convertToBase64Url(image))),
  createStream: (playlist_title, tags, default_artwork_url, songs) => dispatch(createStream(playlist_title, tags, default_artwork_url, songs)),
  maybeSetEchoCliSession: () => maybeSetEchoCliSession(dispatch)
});

class streamPublicationDialog extends Component {

  static propTypes = {
  }

  state = {sbVisibility: false}

  componentWillReceiveProps(nextProps){
    return nextProps.visible ? this.props.maybeSetEchoCliSession() : false;
  }

  hideSnackbar = () => this.setState({sbVisibility: false});
  showSnackBar = () => this.setState({sbVisibility: true});

  render() {
    return(
      <div>
        <Dialog
          active={this.props.visible}
          theme={dialogTheme}
          onEscKeyDown={this.props.toggleVisibility}
        >
          {this.props.authed ? <StreamPublication {...this.props} showSnackBar={this.showSnackBar} /> : <Login />}
        </Dialog>

        <SavedStreamSnackbar
          onTimeout={this.hideSnackbar}
          onClick={this.hideSnackbar}
          active={this.state.sbVisibility}
          streamTitle='' />
      </div>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(streamPublicationDialog);
