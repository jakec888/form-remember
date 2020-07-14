import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async request => {
  if (request.command == 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME') {
    await console.log('GET_ALL_VISIBLE_TEXT_INPUTS_NAME');

    let visibleInput = await [];

    let all = await document.getElementsByTagName('input');

    await console.log(all);

    for (let i = 0; i < all.length; i++) {
      // var style = await window.getComputedStyle(all[i]);
      if (
        // style.display !== 'none' ||
        // style.visibility !== 'hidden' ||
        all[i].attributes['type'].value !== 'hidden' &&
        all[i].attributes['type'].value === 'text'
      ) {
        visibleInput.push(all[i].name.toString());
      }
    }

    await console.log(`Visible Inputs:`);
    await console.log(visibleInput);

    return visibleInput;
  }
});
