import differenceBy from 'lodash/differenceBy'
import {ADD_SONGS, REMOVE_SONGS} from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_SONGS:
      return state.concat(action.payload);
    case REMOVE_SONGS:
      return differenceBy(state, action.payload, 'id')
    default:
      return state;
  }
};
