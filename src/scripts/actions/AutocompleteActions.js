import {UPDATE_AUTOCOMPLETE, SEARCH_AND_UPDATE_AUTOCOMPLETE} from "../constants/ActionTypes";

export function updateAutocomplete(variants) {
  return {
    type: UPDATE_AUTOCOMPLETE,
    payload: variants
  }
}

export function searchAndUpdateAutocomplete(term) {
  return {
    type: SEARCH_AND_UPDATE_AUTOCOMPLETE,
    payload: term
  }
}
