function isHidden(el) {
  var style = window.getComputedStyle(el);
  return (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    all[i].attributes['type'].value === 'hidden'
  );
}

let all = document.getElementsByTagName('input');

let my_input = [];

for (var i = 0, max = all.length; i < max; i++) {
  if (isHidden(all[i]) === false) {
    my_input.push(all[i]);
  }
}

// let all = document.getElementsByTagName('input');

// let vis = [];

// for (let i = 0; i <= all.length; i++) {
//   if (all[i].attributes['type'].value !== 'hidden') {
//     vis.push(all[i]);
//   }
// }

// for (let i = 0; i < all.length; i++) {
//   // console.log(all[i]);
//   if (all[i].attributes['type'].value !== 'hidden') {
//     vis.push(all[i]);
//   }
// }
