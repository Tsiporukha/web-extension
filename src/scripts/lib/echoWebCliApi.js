export function isEchoApi(){ return !!window.echoApi }

export function playQueue(songs, playingSongPosition = 0) {
  return window.echoApi.playStream(createStreamData(songs), playingSongPosition);
}

export function either(right, left = () => false) {
  return isEchoApi() ? right() : left();
}


function createStreamData(songs) {
  return {
    playlist: {
      title: 'Current Queue',
      songs
    },
    id: -1,
    history_listeners:[]
  }
}
