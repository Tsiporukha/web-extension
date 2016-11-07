import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addToCurrentQueue, searchAndUpdateSearchQueue} from '../actions/SongsActions';
import SongList from '../components/SongList';
import { Typeahead } from 'react-typeahead'

const mapStateToProps = (state, ownProps) => {
  return {
    songs: state.searchQueue
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToCurrentQueue: (songs) => { dispatch(addToCurrentQueue(songs)) },
    searchAndUpdateSearchQueue: (term) => { dispatch(searchAndUpdateSearchQueue(term)) }
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
            options={[]}
            maxVisible={8}/>

          <button className={'btn btn-info'} type="submit">Search</button>
        </form>

        <SongList songs={this.props.songs} addToCurrentQueue={this.props.addToCurrentQueue}/>
      </div>
    )
  }
}


export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchQueue);
