import React, {Component, PropTypes} from 'react';

import UploadArtwork from './UploadArtwork';

import {Button, Input, Autocomplete} from 'react-toolbox';

import {convertToBase64Url, onReaderLoad} from '../lib/FileReader';

import styles from '../../assets/styles/streamPublication.scss';
import inputTheme from '../../assets/styles/streamPublicationInput.scss';
import autocompleteTheme from '../../assets/styles/streamPublicationAutocomplete.scss';
import bp from '../../assets/styles/bootstrap.css';

import tags from '../../assets/tags.json';


export default class StreamPublication extends Component {

  static propTypes = {
  }

  state = {
    title: '',
    artwork_url: (this.props.songs[0]||{}).artwork_url,
    uploadedArtwork: '',
    tags: []
  };


  render() {
    const selectArtwork = artwork_url => () => this.setState({artwork_url})

    const updTitle = str => this.setState({title: str});

    const setUploadedArtwork = artwork_url => this.setState({uploadedArtwork: artwork_url});
    const rmUploadedArtwork = () => this.setState({uploadedArtwork: ''})

    const getSourceForTagsAutocomplete = (primaryTags = Object.keys(tags), ptags = this.state.tags.filter(tag => primaryTags.includes(tag))) =>
      ptags.length ? ptags.reduce((ftags, ptag) => ftags.concat(tags[ptag]), []) : primaryTags;
    const getTagsSuggestion = () => getSourceForTagsAutocomplete().filter(tag => !this.state.tags.includes(tag));

    const handleTagsChange = tags => this.setState({tags});
    const addTag = tag => () => this.setState({tags: [tag, ...this.state.tags]});
    const removeTag = tag => () => this.setState({tags: this.state.tags.filter(t => t!==tag)});

    const publishStream = () => this.props.createStream(this.state.title, this.state.tags.join(', '), this.state.artwork_url, this.props.songs)
      .then(resp => resp.status == 200 ? resp.json() : Promise.reject(resp)).then(this.props.showSnackBar).then(this.props.toggleVisibility());

    const isValid = () => this.props.songs.length && this.state.title && this.state.tags.length && this.state.artwork_url;

    return(
      <div className={styles.root}>
        <div className={`${bp['container-fluid']} ${styles.npdng}`}>
          <div className={styles.title}>Save to new Playlist:</div>
          <Input className={styles.pName} theme={inputTheme} type='text' name='title' hint='Playlist Name' value={this.state.title} onChange={updTitle} />

          <div className={styles.actionTitle}>Choose Artwork:</div>
          <div className={styles.artworks}>
            <UploadArtwork
              uploadedArtwork={this.state.uploadedArtwork}
              selectArtwork={selectArtwork}
              rmUploadedArtwork={rmUploadedArtwork}
              selectedArtwork={this.state.artwork_url}
              uploadArtwork={this.props.uploadArtwork}
              setUploadedArtwork={setUploadedArtwork}
              styles={styles} />
            {this.props.songs.map(song =>
              <a key={song.id}>
                <img src={song.artwork_url} alt='artwork' onClick={selectArtwork(song.artwork_url)} />
                {this.state.artwork_url == song.artwork_url && <i className={`material-icons ${styles.selected}`}>done</i>}
              </a>
            )}
          </div>
        </div>

        <div className={styles.actionTitle}>Choose Tags:</div>
        <div className={styles.tagsArea}>
          {this.state.tags.slice(0).reverse().map(tag =>
            <span key={tag} className={styles.tag}>
              {tag}<i onClick={removeTag(tag)} className='material-icons'>close</i>
            </span>
          )}
          <Autocomplete
            allowCreate
            multiple
            source={[...getSourceForTagsAutocomplete(),  ...this.state.tags]}
            onChange={handleTagsChange}
            value={this.state.tags}
            theme={autocompleteTheme}
            className={styles.autocomplete}
            direction={'down'}
          />
          {getTagsSuggestion().slice(0,8).map(tag =>
            <span key={tag} onClick={addTag(tag)} className={styles.atag}>{tag}</span>
          )}
        </div>

        <div className={styles.actions}>
          <Button className={styles.cancel} theme={styles} onClick={this.props.toggleVisibility} flat>CANCEL</Button>
          <Button theme={styles} onClick={publishStream} flat primary disabled={!isValid()}>DONE</Button>
        </div>
      </div>
    )
  }
}
