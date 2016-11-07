import 'babel-polyfill'
import {wrapStore} from 'react-chrome-redux';
import configureStore from '../../scripts/store/configureStore'


const store = configureStore();
wrapStore(store, {portName: 'echo-app-ext'}); // make sure portName matches


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "bundle.js"});
});
