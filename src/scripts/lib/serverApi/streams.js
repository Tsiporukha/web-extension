import { v4 } from 'node-uuid';

import {fetcho, getAbsoluteUrl, getJson, appendToFormData} from './api';

export const get = filters => fetcho.get(getAbsoluteUrl('/streams'), filters).then(getJson);

export const like = (id, token) => fetcho.post(getAbsoluteUrl(`/streams/${id}/add_like`), {token}).then(getJson);
export const unlike = (id, token) => fetcho.post(getAbsoluteUrl(`/streams/${id}/remove_like`), {token}).then(getJson);

export const create = (playlist_title, tags, default_artwork_url, songs, token) =>
  fetcho.post(getAbsoluteUrl('/streams'), {playlist_title, tags, default_artwork_url, songs, token}).then(getJson);


export const uploadArtwork = (image, token, key = `data/atrworks/${v4()}${image.name}`) =>
  fetcho(getAbsoluteUrl('/lists/upload_song_artwork'), {method: 'POST', body: appendToFormData({image, token, key})})
    .then(_ => ({artwork_url: `https://s3.amazonaws.com/echoapp-userdata-production/${key}`}));
