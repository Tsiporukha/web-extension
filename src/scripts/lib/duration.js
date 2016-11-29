export function duration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600) % 24,
  minutes = Math.floor(totalSeconds/ 60 ) % 60,
  seconds = Math.floor(totalSeconds % 60);
  return ((hours ? (hours+':' + ('0' + minutes).substr(-2)) : (''+ minutes)) + ':' + ('0' + seconds).substr(-2));
}

export function withHours(totalSeconds) {
  const drtn = duration(totalSeconds);
  return ('00:00:00'.substring(0, (8-drtn.length)) + drtn);
}
