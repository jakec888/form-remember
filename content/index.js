import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async request => {
  await console.log('====================================');
  await console.log('request:');
  await console.log(request);
  await console.log('====================================');
  // await alert(request);

  await console.log('sending return sample');
  let sample = await 1000;
  return sample;
});

// const re = new RegExp('bear', 'gi');
// const matches = document.documentElement.innerHTML.match(re) || [];

// chrome.runtime.sendMessage({
//   url: window.location.href,
//   count: matches.length,
// });
