import {GET_STREAMS, SET_MY_STREAMS, CLEAN_MY_STREAMS} from "../constants/ActionTypes";

export function get(filters) {
  return {
    type: GET_STREAMS,
    payload: filters
  }
}

export function setMyStreams(streamsData) {
  return {
    type: SET_MY_STREAMS,
    payload: streamsData
  }
}
