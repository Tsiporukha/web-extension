import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import PlayPauseStream from './PlayPauseStream';
import MoreTags from '../components/MoreTags';

import {like, unlike} from '../actions/StreamsActions';

import {queueDuration, duration} from '../lib/duration';
import words from 'lodash/words';
import moment from 'moment';

import bp from '../../assets/styles/bootstrap.css';
import styles from '../../assets/styles/streams.scss';
import moreTagsTheme from '../../assets/styles/moreTags.scss';

const mapStateToProps = (state, ownProps) => ({
  user: state.session.user,
  stream: {...ownProps.stream,
    listened: ownProps.stream.history_listeners.includes(state.session.user && state.session.user.id),
    duration: duration(queueDuration(ownProps.stream.playlist.songs))
  }
})

const mapDispatchToProps = dispatch => ({
  toggleLike: stream => () => dispatch(stream.your_likes ? unlike(stream) : like(stream))
});

class Stream extends Component {

  static propTypes = {
  }

  render() {
    const MAX_TAGS_CHARS = 58;

    const getFittedTagsLength = (tags, cindx = 0, clnght = 0, maxChars = MAX_TAGS_CHARS) =>
      cindx < tags.length && clnght + tags[cindx].length < maxChars ? getFittedTagsLength(tags, cindx+1, clnght + tags[cindx].length) : cindx - 1;
    const transformTags = (tags, lastFitted) => ({fitted: tags.slice(0, lastFitted + 1), more: tags.slice(lastFitted + 1)});

    const stream = {...this.props.stream,
      tags: (tags => transformTags(tags, getFittedTagsLength(tags)))(words(this.props.stream.playlist.title, /#([^ ]+)/g))};

    return (
      <div className={`${bp['container-fluid']} no-padding ${styles.stream}`}>

        <div className={`${bp['col-xs-2']} ${styles.img}`}>
          <img src={stream.artwork_url} alt='artwork_url' style={{height: '100px', width: '100px'}} />
          <span className={styles.playPause}>
            <PlayPauseStream songs={stream.playlist.songs} />
          </span>
        </div>

        <div className={`${bp['col-xs-10']} ${styles.textData}`}>
          <div className={`${bp['col-xs-8']} no-padding`} style={{height: '100%'}}>
            <div className={`${styles.title}`}>{stream.playlist.title}</div>
            <div className={`${styles.duration}`}>{stream.playlist.songs.length} songs, {stream.duration}</div>

            <div className={`${bp['col-xs-12']} no-padding ${styles.llArea}`}>
              <div className={`${styles.playerIcon}`}>
                <span className={`${styles.miLike} ${stream.your_likes ? styles.active : ''}`} onClick={this.props.toggleLike(stream)}>
                  <i className={`material-icons ${styles.notLiked}`}>favorite_border</i>
                  <i className={`material-icons ${styles.liked}`}>favorite</i>
                </span>
                <span className={`${styles.counter}`}>{stream.likes_count}</span>
              </div>
              <div className={`${styles.playerIcon}`}>
                <i className={`material-icons ${styles.miListeners} ${stream.listened ? 'active': ''}`}>&#xE310;</i>
                <span className={`${styles.counter} ${styles.ls}`}>{stream.history_listeners.length}</span>
              </div>
            </div>

            <div className={`${styles.tags}`}>
              {stream.tags.fitted.map(tag =>
                <span key={tag} className={`${styles.tag}`}>{tag} </span>
              )}
              {!!stream.tags.more.length && <MoreTags tags={stream.tags.more} />}
            </div>
          </div>

          <div className={`${bp['col-xs-4']} no-padding #{bp['pull-right']}`} style={{height: '100%'}}>
            <div className={`${bp['col-xs-12']} no-padding ${styles.author}`}>
              <div>
                <span>posted by</span>
                <a>
                  <img src={stream.user.avatar_url} alt='user avatar' className={`${styles.avatar}`} />
                  <span>{stream.user.name}</span>
                </a>
              </div>
              <div className={styles.pt}>{moment(stream.updated_at).fromNow()}</div>
            </div>
            <div className={`no-padding ${styles.rIcons}`}>
              <div className={`${styles.playerIcon}`}>
                <i className={`material-icons ${styles.miShare}`}>share</i>
              </div>
              <div className={`${styles.playerIcon}`} style={{position: 'relative', top: '-4px'}}>
                <div>
                  <i className={`material-icons ${styles.miTracklist}`}>queue_music</i>
                  <span className={`${styles.counter} ${styles.tracks}`} >{stream.playlist.songs.length}</span>
                </div>
              </div>
              <div className={`${styles.playerIcon}`} style={{position: 'relative', top: '-3px'}}>
                <i className='material-icons'>playlist_add</i>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Stream);
