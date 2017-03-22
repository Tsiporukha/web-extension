import {fetcho, getAbsoluteUrl} from './api'

const SIGN_IN_PATH = '/sessions/email_sign_in';
const SIGN_UP_PATH = '/email_auth';
const LOGOUT_PATH = '/exit';


export function getToken(email, password) {
  return fetcho.post(getAbsoluteUrl(`${SIGN_IN_PATH}`), {email, password})
    .then(resp => resp.json()).then(data => data.token ? data.token : Promise.reject(data));
}

export function getCurrentUserData(token) {
  return fetcho.get(getAbsoluteUrl(`/me`), {token}).then(resp => resp.status === 200 ? resp.json() : Promise.reject(resp));
}

export function login(email, password) {
  return getToken(email, password).then(token => getCurrentUserData(token).then(user => ({user, token})));
}
