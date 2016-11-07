import { UPDATE_SEARCH_QUEUE, SOME } from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUEUE:
      return action.payload;
    case SOME:
      console.log('some in reducer');
      return state;
    default:
      return state;
  }
};
