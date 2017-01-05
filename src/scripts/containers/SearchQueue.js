import { v4 } from 'node-uuid'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addToCurrentQueue, addToCurrentQueueTop, searchAndUpdateSearchQueue} from '../actions/SongsActions';
import {getAndUpdateAutocomplete} from '../actions/AutocompleteActions';
import {setPlayingSong, play} from '../actions/PlayerActions';
import SongList from '../components/SongList';
import Autocomplete from 'react-toolbox/lib/autocomplete';

import styles from '../../assets/styles/queue.scss';
import bp from '../../assets/styles/bootstrap.css';

const mapStateToProps = (state, ownPropsslider) => {
  return {
    songs: state.searchQueue,
    suggestions: state.searchAutocomplete
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToCurrentQueue: songs => dispatch(addToCurrentQueue(songs)),
    searchAndUpdateSearchQueue: term => dispatch(searchAndUpdateSearchQueue(term)),
    playAll: songs => {
      const fSongs = songs.map(song => ({id: v4(), ...song}) );
      dispatch(addToCurrentQueueTop(fSongs));
      dispatch(setPlayingSong({...fSongs[0], playlist: 'currentQueue'}));
      return dispatch(play());
    },
    getAndUpdateAutocomplete: term => dispatch(getAndUpdateAutocomplete(term))
  }
}

class SearchQueue extends Component {

  updateSearchPhrase = phrase => this.searchPhrase = phrase;

  render(){
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
              onQueryChange={val => {
                if(val.length > 2) this.props.getAndUpdateAutocomplete(val);
                return this.updateSearchPhrase(val);
              }}
              onChange={val => {
                if(val.trim()) this.props.searchAndUpdateSearchQueue(val);
                return this.updateSearchPhrase(val);
              }}
              value={this.searchPhrase}
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
          <i className={`fa fa-soundcloud`} />
          <i className={`fa fa-mixcloud`} />
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
