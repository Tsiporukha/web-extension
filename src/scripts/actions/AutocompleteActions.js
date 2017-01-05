import {GET_AND_UPDATE_AUTOCOMPLETE, UPDATE_AUTOCOMPLETE} from "../constants/ActionTypes";

export function getAndUpdateAutocomplete(term) {
  return {
    type: GET_AND_UPDATE_AUTOCOMPLETE,
    payload: term
  }
}

export function updateAutocomplete(suggestions) {
  return {
    type: UPDATE_AUTOCOMPLETE,
    payload: suggestions
  }
}
