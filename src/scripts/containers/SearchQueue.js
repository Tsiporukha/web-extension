import { v4 } from 'node-uuid'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addToCurrentQueue, addToCurrentQueueTop, searchAndUpdateSearchQueue} from '../actions/SongsActions';
import {setPlayingSong, play} from '../actions/PlayerActions';
import SongList from '../components/SongList';
import { Typeahead } from 'react-typeahead';

import styles from '../../assets/styles/queue.scss';
import bp from '../../assets/styles/bootstrap.css';

const mapStateToProps = (state, ownProps) => {
  return {
    songs: state.searchQueue
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToCurrentQueue: (songs) => { dispatch(addToCurrentQueue(songs)) },
    searchAndUpdateSearchQueue: (term) => { dispatch(searchAndUpdateSearchQueue(term)) },
    playAll: (songs) => {
      const fSongs = songs.map(song => ({id: v4(), ...song}) );
      dispatch(addToCurrentQueueTop(fSongs));
      dispatch(setPlayingSong({...fSongs[0], playlist: 'currentQueue'}));
      dispatch(play());
    }
  }
}

class SearchQueue extends Component {
  render(){
    let typeaheadConstr;
    return (
      <div className={`${styles.queue} h100perc`}>
        <div className={`${bp.row} no-margin ${styles.sqHeader}`}>
          <div className={`${bp['col-xs-9']} no-padding`}>
            <form onSubmit={e => {
              e.preventDefault();
              if (!typeaheadConstr.state.entryValue.trim()) return;
              this.props.searchAndUpdateSearchQueue(typeaheadConstr.state.entryValue);
            }}>
              <Typeahead
                ref={node => { typeaheadConstr = node }}
                // options={this.props.autocomplete}
                className={`${styles.search}`}
                maxVisible={8}
                onKeyUp={ e => {
                  if (!typeaheadConstr || typeaheadConstr.state.entryValue.trim().length < 3) return;
                  console.log(typeaheadConstr.state.entryValue);
                }}
              />
              <button hidden type="submit">.</button>
            </form>
          </div>
          <div className={`${bp['col-xs-3']} ${styles.icons}`}>
            <i onClick={() => { this.props.addToCurrentQueue(this.props.songs) }}
              className={`material-icons`}>add</i>
            <i className={`material-icons`}>playlist_play</i>
            <i onClick={() => { this.props.playAll(this.props.songs) }}
              className={`material-icons`}>play_arrow</i>
          </div>
        </div>
        <div className={`${styles.songList} ${styles.search}`}>
          <SongList
            songs={this.props.songs}
            addToCurrentQueue={this.props.addToCurrentQueue}
            play={(song) => {this.props.playAll([song])}}
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
