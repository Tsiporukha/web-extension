import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import MaybeCurrentUser from './MaybeCurrentUser';

import {get as getStreamsAction, setMyStreams, cleanMyStreams} from '../actions/StreamsActions'

import bp from '../../assets/styles/bootstrap.css';

const mapStateToProps = store => store.session ? {
  user: store.session.user,
  streamsData: store.streams.myStreams,
  filters: store.session.user ? {
    nextStreams: {user_id: store.session.user.id, offset: store.streams.myStreams.offset,
      limit: store.streams.myStreams.limit, fetchedAll: store.streams.myStreams.fetchedAll},
    firstStreams: {user_id: store.session.user.id, offset: 0, limit: store.streams.myStreams.limit, fetchedAll: false},
  } : {}
} : {};

const mapDispatchToProps = dispatch => ({
  getStreams: filters => dispatch(getStreamsAction(filters)),
  setMyStreams: (filters, prevStreams) => data => dispatch(setMyStreams({streams: [...prevStreams, ...data.streams],
    offset: filters.fetchedAll ? filters.offset : filters.offset + filters.limit, limit: filters.limit, fetchedAll: data.count < filters.limit}))
})

class MyStreams extends Component {

  static propTypes = {
  }

  updateStreams = (filters, prevStreams = []) => this.props.getStreams(filters).then(this.props.setMyStreams(filters, prevStreams));
  updateWithNextStreams = () => this.updateStreams(this.props.filters.nextStreams, this.props.streamsData.streams);
  updateWithLatestStreams = () => this.updateStreams(this.props.filters.firstStreams, []);
  getFirstStream = () => this.props.getStreams({...this.props.filters.firstStreams, limit: 1}).then(data => data.streams[0])

  componentDidMount(){
    return this.props.user ? this.getFirstStream().then(stream => (this.props.streamsData.streams.length &&
      stream.id == this.props.streamsData.streams[0].id) ? false : this.updateWithLatestStreams()) : false;
  }


  render(){
    return (
      <div className={`${bp.container} h100perc`}>
        <div className={`${bp['col-xs-offset-2']} ${bp['col-xs-4']} h100perc`}>
          <MaybeCurrentUser />
          <br />
          {this.props.user &&
            <button style={{margin: '40px 0'}} onClick={this.updateWithLatestStreams}>Refresh</button>}

          {this.props.streamsData.streams.map(stream =>
            <div key={stream.id}> {stream.id} </div>
          )}

          {this.props.user && !this.props.filters.nextStreams.fetchedAll &&
            <button style={{margin: '40px 0'}} onClick={this.updateWithNextStreams}>Load more</button>}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStreams);
