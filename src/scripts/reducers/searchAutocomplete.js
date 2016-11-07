import {UPDATE_SEARCH_AUTOCOMPLETE} from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_SEARCH_AUTOCOMPLETE:
      return action.payload;
    default:
      return state;
  }
};
