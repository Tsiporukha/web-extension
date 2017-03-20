import {SET_TOKEN, SET_USER_DATA, CLEAN_SESSION} from '../constants/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {...state, token: action.payload};
    case SET_USER_DATA:
      return {...state, ...action.payload};
    case CLEAN_SESSION:
      return {};
    default:
      return state;
  }
};
