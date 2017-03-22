import fetch from 'isomorphic-fetch';

const SERVER_URL = 'https://api.echoapplication.com';
const API_VERSION = '/v1';

const objToQuery = obj => `?${Object.keys(obj).map(k => `${k}=${obj[k]}`).join('&')}`

export const getAbsoluteUrl = (path, apiV = API_VERSION) => `${SERVER_URL}${apiV}${path}`;
export const configureParamsForPostReq = data => ({
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data)
})


export const fetcho = {
  get: (url, params) => fetch(`${url}${objToQuery(params)}`),
  post: (url, data) => fetch(`${url}`, configureParamsForPostReq(data))
}
