import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async request => {
  if (request.command == 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME') {
    let visibleInputs = {};

    let all = await document.getElementsByTagName('input');

    for (let i = 0; i < all.length; i++) {
      if (
        all[i].attributes['type'].value !== 'hidden' &&
        all[i].attributes['type'].value === 'text'
      ) {
        visibleInputs[all[i].name.toString()] = '';
      }
    }
    return visibleInputs;
  }
});
