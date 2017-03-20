import {AUTH_USER, SET_TOKEN, SET_USER_DATA, CLEAN_SESSION} from "../constants/ActionTypes";

export const authUser = (email, password) => ({
  type: AUTH_USER,
  payload: {email, password}
});

export const setUserData = userData => ({
  type: SET_USER_DATA,
  payload: userData
});

export const cleanSession = () => ({type: CLEAN_SESSION});
