import fetch from 'isomorphic-fetch';
import find from 'lodash/find';

import {YOUTUBE_API_KEY} from '../constants/skeys.js';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export function searchOnYoutube(term){
  return fetch(`${BASE_URL}/search?part=snippet&type=video&videoCategoryId=10&maxResults=15&q=${term}&key=${YOUTUBE_API_KEY}`)
    .then(response =>  response.json())
    .then(json => addYTDuration(json['items']))
    .then(items => items.map(item => parseYoutubeItem(item)));
}

export function getSuggestions(term){
  return fetch(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${term}`).then(resp => resp.json());
}

function addYTDuration(items){
  const idsStr = items.map(item => item['id']['videoId']).join(', ')
  return fetch(`${BASE_URL}/videos?part=contentDetails&id=${idsStr}&key=${YOUTUBE_API_KEY}`)
    .then(response => response.json())
    .then(json => items.map((item, index) => {
      return item['id']['videoId'] == json['items'][index]['id'] ?
       {...item, snippet: {...item['snippet'], duration: json['items'][index]['contentDetails']['duration']} }  :
       {...item, snippet: {...item['snippet'], duration: (find(items, {id: item['id']['videoId']})['contentDetails']['duration']||0)}};
     }
   ));
}

function parseYoutubeItem(item){
  const [artist, title] = item['snippet']['title'].split(/\s[–-]\s/);
  return {
    uid: `youtube/${item['id']['videoId']}`,
    source: 'youtube',
    artwork_url: item['snippet']['thumbnails']['high']['url'],
    data_url: `https://www.youtube.com/watch?v=${item['id']['videoId']}`,
    export_data_url: `https://www.youtube.com/watch?v=${item['id']['videoId']}`,
    artist,
    title,
    duration: ytDurationToSeconds(item['snippet']['duration'])
  }
}

function ytDurationToSeconds(ytDuration){
  const match = ytDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  return (parseInt(match[1]) || 0)*3600 + (parseInt(match[2]) || 0)*60 + (parseInt(match[3]) || 0);
}
