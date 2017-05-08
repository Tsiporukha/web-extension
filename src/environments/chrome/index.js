import React from 'react';
import {render} from 'react-dom';
import {Store} from 'react-chrome-redux';
import Root from '../../scripts/components/Root';

import YT from './yt.js';
if(!(window['YT'] && window['YT'].loaded)) YT();

if(!document.getElementById('echo-app-ext')){
  const div = document.createElement('div');
  div.setAttribute('id', 'echo-app-ext');
  document.body.appendChild(div);
}

window.HIDE_ER_PLAYER = true;
window.EXTENSION = true;

const proxyStore =  new Store({portName: 'echo-app-ext'});

const unsubscribe = proxyStore.subscribe(() => {
  unsubscribe();
  return render(<Root store={proxyStore} />, document.getElementById('echo-app-ext'));
});
