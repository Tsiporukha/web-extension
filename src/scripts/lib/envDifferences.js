export const getFilePath = path => window.EXTENSION ? chrome.extension.getURL(path) : path;
