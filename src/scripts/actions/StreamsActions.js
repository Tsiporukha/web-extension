import {GET_STREAMS, SET_MY_STREAMS, CLEAN_MY_STREAMS, LIKE_STREAM,
  UNLIKE_STREAM, UPDATE_STREAM, UPLOAD_ARTWORK} from "../constants/ActionTypes";

export const get = filters => ({
  type: GET_STREAMS,
  payload: filters
});

export const setMyStreams = streamsData => ({
  type: SET_MY_STREAMS,
  payload: streamsData
})

export const like = stream => ({
  type: LIKE_STREAM,
  payload: stream
});

export const unlike = stream => ({
  type: UNLIKE_STREAM,
  payload: stream
});

export const update = stream => ({
  type: UPDATE_STREAM,
  payload: stream
});

export const maybeUpdate = (status, stream) => dispatch => status == 'ok' ? dispatch(update(stream)) : false;


export const uploadArtwork = image => ({
  type: UPLOAD_ARTWORK,
  payload: image
});
