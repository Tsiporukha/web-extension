import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {wrapStore} from 'react-chrome-redux';
import configureStore from '../../scripts/store/configureStore';

import Player from '../../scripts/containers/Player';

import YT from './yt.js';
if(!(window['YT'] && window['YT'].loaded)) YT();


const store = configureStore();
wrapStore(store, {portName: 'echo-app-ext'}); // make sure portName matches

const rmCode = "if(document.getElementById('echo-app-ext')) document.getElementById('echo-app-ext').remove()";
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({}, tabs => {
    tabs.forEach((tab, index) => {
      chrome.tabs.executeScript(tab.id, {code: rmCode})
    });
    chrome.tabs.executeScript(null, {file: "bundle.js"});
  });
});

render(
  <Provider store={store}>
    <Player />
  </Provider>,
  document.getElementById('echo-app-ext')
)
