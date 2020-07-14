// import {
//   GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
//   GET_ALL_VISIBLE_TEXT_INPUTS_NAME_SUCCESS,
// } from '../constants/input';

// export const getAllVisibleInputs = () => ({
//   type: GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
// });

// export const getAllVisibleInputsSuccess = listOfVisibleInputNames => ({
//   type: GET_ALL_VISIBLE_TEXT_INPUTS_NAME_SUCCESS,
//   payload: {listOfVisibleInputNames},
// });

//////////////

// import {GET_ALL_VISIBLE_TEXT_INPUTS_NAME} from '../constants/input';

// import browser from 'webextension-polyfill';

// export const getAllVisibleInputs = () => {
//   console.log('starting...');
//   return dispatch => {
//     console.log('getting tabs');
//     browser.tabs
//       .query({currentWindow: true, active: true})
//       .then(tabs => {
//         console.log('getting listOfVisibleInputNames');
//         browser.tabs
//           .sendMessage(tabs[0].id, {
//             command: 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME',
//           })
//           .then(listOfVisibleInputNames => {
//             console.log('listOfVisibleInputNames');
//             console.log(listOfVisibleInputNames);
//             console.log(typeof listOfVisibleInputNames);
//             dispatch({
//               type: GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
//               payload: {listOfVisibleInputNames},
//             });
//           })
//           .catch(err => console.log(`Error Getting List:\n${err}`));
//       })
//       .catch(err => console.log(`Error Getting Tabs:\n${err}`));
//   };
// };

//////////////

import {GET_ALL_VISIBLE_TEXT_INPUTS_NAME} from '../constants/input';

export const getAllVisibleInputs = visibleTextInputs => ({
  type: GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
  payload: {visibleTextInputs},
});
