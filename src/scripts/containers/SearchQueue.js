import { v4 } from 'node-uuid';
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {addToCurrentQueue, addToCurrentQueueTop, searchAndUpdateSearchQueue, addToCurrentQueueTopAndPlay} from '../actions/SongsActions';
import {getAndUpdateAutocomplete} from '../actions/AutocompleteActions';
import {setPlayingSong, setPlayingSongId, play} from '../actions/PlayerActions';
import SongList from '../components/SongList';
import Autocomplete from 'react-toolbox/lib/autocomplete';

import * as EchoCli from '../lib/echoWebCliApi';

import styles from '../../assets/styles/queue.scss';
import bp from '../../assets/styles/bootstrap.css';

const mapStateToProps = (state, ownPropsslider) => ({
  songs: state.searchQueue,
  suggestions: state.searchAutocomplete
});

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    addToCurrentQueue: songs => {
      dispatch(addToCurrentQueue(songs))
      return EchoCli.maybe(() =>  EchoCli.maybeUpdatePlaylistSongs('currentQueue', EchoCli.CURRENT_QUEUE_ID));
    },
    searchAndUpdateSearchQueue: term => dispatch(searchAndUpdateSearchQueue(term)),

    /**
     * Add all songs from SongList to CurrentQueue top, then start first song
     * playing from current queue
     * @param  {array} songs
     */
    playAll: songs => dispatch(addToCurrentQueueTopAndPlay(songs.map(song => ({id: v4(), ...song})))),
    getAndUpdateAutocomplete: term => dispatch(getAndUpdateAutocomplete(term))
  }
}

class SearchQueue extends Component {

  static propTypes = {
    songs: PropTypes.array,
    suggestions: PropTypes.array,

    getAndUpdateAutocomplete: PropTypes.func,
    addToCurrentQueue: PropTypes.func,
    playAll: PropTypes.func,
    searchAndUpdateSearchQueue: PropTypes.func
  }

  render(){

    // Autocomplete
    const updateSearchPhrase = phrase => this.searchPhrase = phrase;

    const onAutocompleteQueryChange = val => {
      if(val.length > 2) this.props.getAndUpdateAutocomplete(val);
      return updateSearchPhrase(val);
    }

    const onAutocompleteValueChange = val => {
      if(val.trim()) this.props.searchAndUpdateSearchQueue(val);
      return updateSearchPhrase(val);
    }

    return (
      <div className={`${styles.queue} h100perc`}>
        <div className={`${bp.row} no-margin ${styles.sqHeader}`}>
          <div className={`${styles.search} no-padding`}>
            <Autocomplete
              className={styles.input}
              allowCreate
              multiple={false}
              direction='down'
              source={this.props.suggestions}
              onQueryChange={onAutocompleteQueryChange}
              onChange={onAutocompleteValueChange}
              value={this.searchPhrase}
              theme={styles}
            />
          </div>
          <div className={`${styles.icons}`}>
            <i onClick={() => this.props.playAll(this.props.songs)}
              className={`material-icons`}>play_arrow</i>
            <i className={`material-icons`}>playlist_play</i>
            <i onClick={() => this.props.addToCurrentQueue(this.props.songs)}
              className={`material-icons`}>add</i>
          </div>
        </div>

        <div className={`${bp.row} no-margin ${styles.sources} ${styles.active}`}>
          <i className={`fa fa-youtube `} />
          {
          //  <i className={`fa fa-soundcloud`} />
          //  <i className={`fa fa-mixcloud`} />
          }
        </div>

        <div className={`${styles.songList} ${styles.searchList}`}>
          <SongList
            songs={this.props.songs}
            addToCurrentQueue={this.props.addToCurrentQueue}
            play={song => this.props.playAll([song])}
          />
        </div>
      </div>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchQueue);
