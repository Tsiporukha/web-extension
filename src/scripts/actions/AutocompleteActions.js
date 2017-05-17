import {GET_AND_UPDATE_AUTOCOMPLETE, UPDATE_AUTOCOMPLETE} from "../constants/ActionTypes";

export const getAndUpdateAutocomplete = term => ({
  type: GET_AND_UPDATE_AUTOCOMPLETE,
  payload: term
});

export const updateAutocomplete = suggestions => ({
  type: UPDATE_AUTOCOMPLETE,
  payload: suggestions
});
