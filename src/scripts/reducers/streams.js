import {SET_MY_STREAMS, CLEAN_MY_STREAMS, UPDATE_STREAM} from '../constants/ActionTypes';

const initialState = {
  myStreams: {streams: [], offset: 0, limit: 5, fetchedAll: false}
};

const FNAMES = ['myStreams'];
const getFibersObj = (state, fnames = FNAMES) => ({...fnames.reduce((fibersData, fname) => ({...fibersData, [fname]: state[fname]}), {})});
const getStreamIndex = (streams, stream) => streams.findIndex(strm => strm.id == stream.id);
// const updateFiber = (fiber, uStream, uStreamIndex) => [...fiber.slice(0, uStreamIndex), uStream, ...fiber.slice(uStreamIndex + 1)];
const updateFiberStreams = (streams, uStream, uStreamIndex) => [...streams.slice(0, uStreamIndex), uStream, ...streams.slice(uStreamIndex + 1)];
//const maybeUpdateFiber = (fiber, stream) => fiber.some(strm => strm.id == stream.id) ? updateFiber(fiber, stream, getStreamIndex(fiber, stream)) : false;
const maybeUpdateFiber = (fiber, stream) => fiber.streams.some(strm => strm.id == stream.id) ?
  {...fiber, streams: updateFiberStreams(fiber.streams, stream, getStreamIndex(fiber.streams, stream))} : fiber;
const updateFibers = (stream, fibersObj) =>
  Object.keys(fibersObj).reduce((fobj, fname) => ({...fobj, [fname]: maybeUpdateFiber(fibersObj[fname], stream)}), {});
  // fnames.reduce((fibersData, fname) => ({...fibersData, ...{[fname]: maybeUpdateFiber(state[fname], stream)}}) )

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MY_STREAMS:
      return {...state, myStreams: action.payload};
    case CLEAN_MY_STREAMS:
      return {...state, myStreams: initialState.myStreams}
    case UPDATE_STREAM:
      return {...state, ...updateFibers(action.payload, getFibersObj(state))};
    default:
      return state;
  }
};
