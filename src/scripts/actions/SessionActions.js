import {AUTH_USER, SET_TOKEN, SET_USER_DATA, CLEAN_SESSION, UPDATE_CURRENT_USER_DATA} from "../constants/ActionTypes";

export const authUser = (email, password) => ({
  type: AUTH_USER,
  payload: {email, password}
});

export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: userData
});

export const updateCurrentUserData = token => ({type: UPDATE_CURRENT_USER_DATA});

export const cleanSession = () => ({type: CLEAN_SESSION});
