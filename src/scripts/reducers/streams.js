import {SET_MY_STREAMS, CLEAN_MY_STREAMS} from '../constants/ActionTypes';

const initialState = {
  myStreams: {streams: [], offset: 0, limit: 5, fetchedAll: false}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_STREAMS:
      return {...state, myStreams: action.payload};
    case CLEAN_MY_STREAMS:
      return {...state, myStreams: initialState.myStreams}
    default:
      return state;
  }
};
