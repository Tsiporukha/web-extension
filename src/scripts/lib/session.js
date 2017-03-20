import fetch from 'isomorphic-fetch';

const SERVER_URL = 'https://api.echoapplication.com';
const API_VERSION = '/v1';
const SIGN_IN_PATH = '/sessions/email_sign_in';
const SIGN_UP_PATH = '/email_auth';
const LOGOUT_PATH = '/exit';

const getAbsoluteUrl = path => `${SERVER_URL}${API_VERSION}${path}`;
const representAsPostParams = data => ({method: 'POST', body: data});
const configureParamsForPostReq = data => ({
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data)
})


export function getToken(email, password) {
  return fetch(getAbsoluteUrl(`${SIGN_IN_PATH}`), configureParamsForPostReq({email, password}))
    .then(resp => resp.json()).then(data => data.token ? data.token : Promise.reject(data));
}

export function getCurrentUserData(token) {
  return fetch(getAbsoluteUrl(`/me?token=${token}`)).then(resp => resp.status === 200 ? resp.json() : Promise.reject(resp));
}

export function login(email, password) {
  return getToken(email, password).then(token => getCurrentUserData(token).then(user => ({user, token})));
}
