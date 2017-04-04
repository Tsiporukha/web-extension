import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import UploadArtwork from '../components/UploadArtwork';

import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import Autocomplete from 'react-toolbox/lib/autocomplete';

import {uploadArtwork, create as createStream} from '../actions/StreamsActions';

import {convertToBase64Url, onReaderLoad} from '../lib/FileReader';

import styles from '../../assets/styles/streamPublication.scss';
import dialogTheme from '../../assets/styles/streamPublicationDialogTheme.scss';
import bp from '../../assets/styles/bootstrap.css';

import tags from '../../assets/tags.json';

const mapStateToProps = (state, ownProps) => ({
  songs: state.currentQueue
})

const mapDispatchToProps = dispatch => ({
  uploadArtwork: image => callback =>
    Promise.resolve(onReaderLoad(e => dispatch(uploadArtwork(e.target.result, image.name)).then(callback), convertToBase64Url(image))),
  createStream: (playlist_title, tags, default_artwork_url, songs) => dispatch(createStream(playlist_title, tags, default_artwork_url, songs))
});

class StreamPublication extends Component {

  static propTypes = {
  }

  state = {
    title: '',
    artwork_url: this.props.songs[0].artwork_url,
    uploadedArtwork: '',
    tags: []
  };

  selectArtwork = artwork_url => () => this.setState({artwork_url})

  render() {
    const updTitle = str => this.setState({title: str});

    const setUploadedArtwork = artwork_url => this.setState({uploadedArtwork: artwork_url});
    const rmUploadedArtwork = () => this.setState({uploadedArtwork: ''})

    const getSourceForTagsAutocomplete = (primaryTags = Object.keys(tags), ptags = this.state.tags.filter(tag => primaryTags.includes(tag))) =>
      ptags.length ? ptags.reduce((ftags, ptag) => ftags.concat(tags[ptag]), []) : primaryTags;

    const handleTagsChange = tags => this.setState({tags});
    const publishStream = () => this.props.createStream(this.state.title, this.state.tags.join(', '), this.state.artwork_url, this.props.songs).then(_ => this.props.toggleVisibility());

    return(
      <Dialog
        active={this.props.visible}
        theme={dialogTheme}
        onEscKeyDown={this.props.toggleVisibility}
      >
        <div className={`${bp['container-fluid']} ${styles.npdng}`}>
          <div className={styles.title}>Save to new Playlist:</div>
          <Input className={styles.pName} type='text' name='title' hint='Playlist Name' value={this.state.title} onChange={updTitle} />

          <div>Choose Artwork:</div>
          <div className={styles.artworks}>
            <UploadArtwork
              uploadedArtwork={this.state.uploadedArtwork}
              selectArtwork={this.selectArtwork}
              rmUploadedArtwork={rmUploadedArtwork}
              selectedArtwork={this.state.artwork_url}
              uploadArtwork={this.props.uploadArtwork}
              setUploadedArtwork={setUploadedArtwork}
              styles={styles} />
            {this.props.songs.map(song =>
              <a key={song.id}>
                <img src={song.artwork_url} alt='artwork' onClick={this.selectArtwork(song.artwork_url)} />
                {this.state.artwork_url == song.artwork_url && <i className={`material-icons`}>gif</i>}
              </a>
            )}
          </div>
        </div>

        <div>Choose Tags:</div>
        <Autocomplete
          allowCreate
          multiple
          source={[...getSourceForTagsAutocomplete(),  ...this.state.tags]}
          onChange={handleTagsChange}
          value={this.state.tags}
        />


        <div className={`${bp['col-xs-12']} ${bp['pull-right']}`}>
          <div>
            <button onClick={this.props.toggleVisibility}>Cancel</button>
            <button onClick={publishStream}>Done</button>
          </div>
        </div>
      </Dialog>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamPublication);
