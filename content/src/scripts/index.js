import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'webext-redux';

import browser from 'webextension-polyfill';

import App from './components/App';

browser.runtime.onMessage.addListener(async request => {
  if (request.command == 'IMPORT_MAP') {
    await console.log('IMPORT_MAP');

    let input = await document.getElementById('fileElem');
    await console.log(input);

    await input.click();
    await console.log('clicked!');
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
    console.log('POST_ALL_VISIBLE_TEXT_INPUTS_NAME');
    console.log(request.data);
    console.log(request.visibleTextInputs);

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
anchor.id = 'rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById('rcr-anchor'),
  );
});
