import { v4 } from 'node-uuid'
import * as types from '../constants/ActionTypes';


export function addToCurrentQueue(songs) {
  return {
    type: types.ADD_SONGS,
    payload: songs.map(song => ({id: v4(), playlist: 'currentQueue', ...song}) )
  }
}

export function addToCurrentQueueTop(songs) {
  return {
    type: types.ADD_SONGS_TO_TOP,
    payload: songs.map(song => ({id: v4(), playlist: 'currentQueue', ...song}) )
  }
}

export function removeFromCurrentQueue(songs) {
  return {
    type: types.REMOVE_SONGS,
    payload: songs
  }
}

export function updateSearchQueue(songs) {
  return {
    type: types.UPDATE_SEARCH_QUEUE,
    payload: songs
  }
}

export function searchSongs(term) {
  return {
    type: types.SEARCH_SONGS,
    payload: term
  }
}

export function searchAndUpdateSearchQueue(term) {
  return {
    type: types.SEARCH_AND_UPDATE_SEARCH_QUEUE,
    payload: term
  }
}
