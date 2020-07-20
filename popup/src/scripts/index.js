/*

This is the Popup

runs when the extension icon is clicked

*/

import React from 'react';
import {render} from 'react-dom';

import {Store} from 'webext-redux';
import {Provider} from 'react-redux';

import App from './App';

const proxyStore = new Store();

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
});
