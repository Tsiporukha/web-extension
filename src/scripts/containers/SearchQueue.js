import { v4 } from 'node-uuid'
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addToCurrentQueue, addToCurrentQueueTop, searchAndUpdateSearchQueue} from '../actions/SongsActions';
import {setPlayingSong, play} from '../actions/PlayerActions';
import SongList from '../components/SongList';
import { Typeahead } from 'react-typeahead';

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
      <div>
        Search queue
        <form onSubmit={e => {
          e.preventDefault();
          if (!typeaheadConstr.state.entryValue.trim()) return;
          this.props.searchAndUpdateSearchQueue(typeaheadConstr.state.entryValue);
        }}>
          <Typeahead
            ref={node => { typeaheadConstr = node }}
            //  options={this.props.autocomplete}
            maxVisible={8}
            onKeyUp={ e => {
              if (!typeaheadConstr || typeaheadConstr.state.entryValue.trim().length < 3) return;
              console.log(typeaheadConstr.state.entryValue);
            }}
          />
          <button className={'btn btn-info'} type="submit">Search</button>
        </form>
        <button onClick={() => { this.props.addToCurrentQueue(this.props.songs) }}
          className={'btn btn-success'}> add all to queue </button>
        <button onClick={() => { this.props.playAll(this.props.songs) }}
          className={'btn btn-success'}> play all </button>
        <SongList
          songs={this.props.songs}
          addToCurrentQueue={this.props.addToCurrentQueue}
          play={(song) => {this.props.playAll([song])}}
        />
      </div>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchQueue);
