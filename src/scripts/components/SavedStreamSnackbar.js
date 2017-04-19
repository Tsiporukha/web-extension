import React from 'react';
import Snackbar from 'react-toolbox/lib/snackbar';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/streamPublicationSnackbar.scss';

const SnackbarContent = ({streamTitle}) => (<div>
  <i className='material-icons'>done</i><br />
  <span>Saved {streamTitle} to My Playlists.</span>
</div>)

const SavedStreamSnackbar = ({streamTitle, active, onTimeout, onClick}) => (
  <Snackbar
    active={active}
    label={<SnackbarContent streamTitle={streamTitle} />}
    timeout={2000}
    onTimeout={onTimeout}
    onClick={onClick}
    type='accept'
    theme={styles}
  />
)

export default SavedStreamSnackbar;
