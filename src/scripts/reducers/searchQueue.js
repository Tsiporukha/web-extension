import { UPDATE_SEARCH_QUEUE } from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUEUE:
      return action.payload;
    default:
      return state;
  }
};
