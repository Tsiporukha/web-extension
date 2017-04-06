import React from 'react';
import bp from '../../assets/styles/bootstrap.css';

const UploadArtwork = ({uploadedArtwork, selectArtwork, rmUploadedArtwork, uploadArtwork, selectedArtwork, setUploadedArtwork, styles}) => {
  const uploadAndSet = () => uploadArtwork(refs.artworkToUpload.files[0])(({artwork_url}) => setUploadedArtwork(artwork_url));
  const refs = {};

  return(
    uploadedArtwork ?
      <a>
        <img src={uploadedArtwork} alt='artwork' onClick={selectArtwork(uploadedArtwork)} />
        <i className={`material-icons`} onClick={rmUploadedArtwork}>close</i>
        {selectedArtwork == uploadedArtwork && <i className={`material-icons`}>done</i>}
      </a>
      :
      <div className={`${bp['col-xs-1']} ${styles.upload}`}>
        <div className={styles.empty}>
          <i className='material-icons'>file_upload</i> <br />
          <span>Upload Artwork</span>
          <input
            type='file'
            accept='image/*'
            ref={artworkToUpload => (refs.artworkToUpload = artworkToUpload)}
            onChange={uploadAndSet} />
        </div>
      </div>
  )
};

export default UploadArtwork;
