import 'babel-polyfill'
import {wrapStore} from 'react-chrome-redux';
import configureStore from '../../scripts/store/configureStore'


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
