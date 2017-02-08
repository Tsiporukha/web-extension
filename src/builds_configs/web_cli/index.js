import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import configureStore from '../../scripts/store/configureStore';
import Root from '../../scripts/components/Root';
import ExtApi from '../../scripts/lib/extensionApi';

export const store = configureStore();
window.ExtApi = ExtApi(store);

render(
  <Root store={store} />,
  document.getElementById('echo-app-ext')
)
