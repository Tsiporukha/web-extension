import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog';

import styles from '../../assets/styles/streamPublication.scss';
import dialogTheme from '../../assets/styles/streamPublicationDialogTheme.scss';


const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
});

class StreamPublication extends Component {

  static propTypes = {
  }

  render() {
    return(
      <Dialog
        active={this.props.visible}
        theme={dialogTheme}
        onEscKeyDown={this.props.toggleVisibility}
      >
        <div className={styles.title}>Save to new Playlist:</div>
      </Dialog>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamPublication);
