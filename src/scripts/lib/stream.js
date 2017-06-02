export const isSong = song => !!song.data_url;

export const getQueueSongs = queue => queue.reduce((songs, s) => songs.concat(s.export_data_url ? s : s.playlist.songs), [])
export const getQueueSongsLength = queue => queue.reduce((ts, s) => (ts + (isSong(s) ? 1 : s.playlist.songs.length)), 0)


export const getPlaylistDuration = songs => songs.reduce((td, sng) => td + sng.duration, 0);

export const getQueueDuration = queue => queue.reduce((td, s) => td + (isSong(s) ? s.duration : getPlaylistDuration(s.playlist.songs)), 0);
