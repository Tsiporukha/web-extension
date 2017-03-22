import {fetcho, getAbsoluteUrl} from './api';

export function get(filters) {
  return fetcho.get(getAbsoluteUrl('/streams'), filters).then(resp => resp.json())
}
