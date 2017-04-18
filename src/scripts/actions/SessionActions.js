import * as EchoCli from '../lib/echoWebCliApi';

import {AUTH_USER, SET_TOKEN, SET_USER_DATA, CLEAN_SESSION, UPDATE_CURRENT_USER_DATA,
  SET_ECHO_CLI_SESSION} from "../constants/ActionTypes";

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

export const setEchoCliSession = () => ({type: SET_ECHO_CLI_SESSION})

export const maybeSetEchoCliSession = dispatch => EchoCli.maybe(() => dispatch(setEchoCliSession()));
