import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import MaybeCurrentUser from './MaybeCurrentUser';
import Stream from './Stream';

import {get as getStreamsAction, setMyStreams, cleanMyStreams} from '../actions/StreamsActions';
import {updateCurrentUserData, maybeSetEchoCliSession} from '../actions/SessionActions';

import * as EchoCli from '../lib/echoWebCliApi';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/streams.scss';

const mapStateToProps = store => ({
  user: store.session.user,
  streamsData: store.streams.myStreams,
  filters: store.session.user ? {
    nextStreams: {user_id: store.session.user.id, offset: store.streams.myStreams.offset,
      limit: store.streams.myStreams.limit, fetchedAll: store.streams.myStreams.fetchedAll},
    firstStreams: {user_id: store.session.user.id, offset: 0, limit: store.streams.myStreams.limit, fetchedAll: false},
  } : {}
});

const mapDispatchToProps = dispatch => ({
  getStreams: filters => dispatch(updateCurrentUserData()).then(_ => dispatch(getStreamsAction(filters))),
  updateCurrentUserData: () => dispatch(updateCurrentUserData()),
  setMyStreams: (filters, prevStreams) => data => dispatch(setMyStreams({streams: [...prevStreams, ...data.streams],
    offset: filters.fetchedAll ? filters.offset : filters.offset + filters.limit, limit: filters.limit, fetchedAll: data.count < filters.limit})),
  maybeSetEchoCliSession: () => maybeSetEchoCliSession(dispatch)
})

class MyStreams extends Component {

  static propTypes = {
  }

  updateStreams = (filters, prevStreams = []) => this.props.getStreams(filters).then(this.props.setMyStreams(filters, prevStreams));
  updateWithNextStreams = () => this.updateStreams(this.props.filters.nextStreams, this.props.streamsData.streams);
  updateWithLatestStreams = () => this.updateStreams(this.props.filters.firstStreams, []);
  getFirstStream = () => this.props.getStreams({...this.props.filters.firstStreams, limit: 1}).then(data => data.streams[0])

  componentDidMount(){
    const maybeUpdateUserAndStreams = () => (this.props.user && this.props.streamsData.streams.length) ?
      this.props.updateCurrentUserData().then(_ => this.getFirstStream()).then(stream =>
        (this.props.streamsData.streams.length && stream.id == this.props.streamsData.streams[0].id) ? false : this.updateWithLatestStreams()) : false;

    return EchoCli.either(this.props.maybeSetEchoCliSession, maybeUpdateUserAndStreams);
  }


  render(){
    return (
      <div className={`${bp.container} h100perc`}>
        <div style={{textAlign: 'center'}}>
          <MaybeCurrentUser />
          <br />
          {!this.props.streamsData.streams.length && <div className={styles.empty}>
            <i className='material-icons'>queue_music</i> <br />
            <span>You don't have any playlists yet</span>
          </div>}
          {this.props.user &&
            <button className={styles.refresh} onClick={this.updateWithLatestStreams}>Refresh</button>}
        </div>

        {this.props.user && <div className={`${bp['col-xs-offset-2']} ${bp['col-xs-8']}`}>
          {this.props.streamsData.streams.map(stream =>
            <Stream key={stream.id} stream={stream} />
          )}

          {this.props.user && !this.props.filters.nextStreams.fetchedAll &&
            <button style={{margin: '40px 0'}} onClick={this.updateWithNextStreams}>Load more</button>}
        </div>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStreams);
