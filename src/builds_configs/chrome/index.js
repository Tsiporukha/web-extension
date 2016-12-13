import React from 'react';
import {render} from 'react-dom';
import {Store} from 'react-chrome-redux';
import Root from '../../scripts/components/Root';

import YT from './yt.js';
if(!(window['YT'] && window['YT'].loaded)) YT();

if(!document.getElementById('echo-app-ext')){
  document.body.innerHTML = document.body.innerHTML + '<div id="echo-app-ext"></div>';
}


const proxyStore =  new Store({portName: 'echo-app-ext'});

render(
  <Root store={proxyStore} />,
  document.getElementById('echo-app-ext')
);
