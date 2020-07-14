import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async request => {
  if (request.command == 'GET_ALL_VISIBLE_INPUT_NAMES') {
    await console.log('GET_ALL_VISIBLE_INPUT_NAMES');

    let visibleInput = await [];

    let all = await document.getElementsByTagName('input');

    await console.log(all);

    for (let i = 0; i < all.length; i++) {
      var style = await window.getComputedStyle(all[i]);
      if (
        // style.display !== 'none' ||
        // style.visibility !== 'hidden' ||
        all[i].attributes['type'].value !== 'hidden' &&
        all[i].attributes['type'].value === 'text'
      ) {
        visibleInput.push(all[i].name.toString());
      }
    }

    await console.log(`Visible Inputs:\n${visibleInput}`);

    return visibleInput;
  }
});

// const re = new RegExp('bear', 'gi');
// const matches = document.documentElement.innerHTML.match(re) || [];

// chrome.runtime.sendMessage({
//   url: window.location.href,
//   count: matches.length,
// });
