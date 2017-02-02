
import React from 'react';
import { render } from 'react-dom';

// import {clearState} from '../../scripts/store/localStorage';
import configureStore from '../../scripts/store/configureStore';
import Root from '../../scripts/components/Root';


const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('echo-app-ext')
)
