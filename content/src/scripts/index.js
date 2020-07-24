/*

This is the Content

runs on the current visible page

adds event listeners that run on the current page
commands and messages from the popup or background stored here

*/

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'webext-redux';

import App from './components/App';

import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async request => {
  if (request.command == 'IMPORT_JSON_FROM_CONTENT') {
    console.log('IMPORT_JSON_FROM_CONTENT');

    localStorage.setItem('FormAutomation', request.data);
  }

  if (request.command == 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME') {
    let visibleInputs = {};

    let all = await document.getElementsByTagName('input');

    for (let i = 0; i < all.length; i++) {
      if (
        (all[i].attributes['type'].value !== 'hidden' &&
          all[i].attributes['type'].value === 'text') ||
        all[i].attributes['type'].value === 'email'
      ) {
        visibleInputs[all[i].name.toString()] = '';
      }
    }
    return visibleInputs;
  }

  if (request.command == 'POST_ALL_VISIBLE_TEXT_INPUTS_NAME') {
    let data = request.data;
    let visibleTextInputs = request.visibleTextInputs;

    // add visible form inputs that are not in the hashmap
    Object.keys(visibleTextInputs).forEach(name => {
      // if data has a visible text input name, update visible input with the name's value
      data.has(name) &&
        (document.getElementsByName(name)[0].value = data.get(name));
    });
  }
});

const proxyStore = new Store();

const anchor = document.createElement('div');
anchor.id = 'form-automation-extension';

document.body.insertBefore(anchor, document.body.childNodes[0]);

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById('form-automation-extension'),
  );
});
