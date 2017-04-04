export const convertToBase64Url = (file, reader = new FileReader()) => {
  reader.readAsDataURL(file);
  return reader;
}
export const onReaderLoad = (fn, reader = new FileReader()) => {
  reader.onload = fn;
  return reader;
}

export const urlToFile = (url, filename, mimeType) => fetch(url)
  .then(res => res.arrayBuffer()).then(buf => new File([buf], filename, {type: mimeType}));
