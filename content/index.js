import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(request => {
  console.log('====================================');
  console.log('request:');
  console.log(request);
  console.log('====================================');
  alert(request);
});

// const re = new RegExp('bear', 'gi');
// const matches = document.documentElement.innerHTML.match(re) || [];

// chrome.runtime.sendMessage({
//   url: window.location.href,
//   count: matches.length,
// });
