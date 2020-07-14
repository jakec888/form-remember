// import {
//   GET_ALL_VISIBLE_INPUT_NAMES,
//   GET_ALL_VISIBLE_INPUT_NAMES_SUCCESS,
// } from '../constants/input';

// export const getAllVisibleInputs = () => ({
//   type: GET_ALL_VISIBLE_INPUT_NAMES,
// });

// export const getAllVisibleInputsSuccess = listOfVisibleInputNames => ({
//   type: GET_ALL_VISIBLE_INPUT_NAMES_SUCCESS,
//   payload: {listOfVisibleInputNames},
// });

import {GET_ALL_VISIBLE_INPUT_NAMES} from '../constants/input';

export const getAllVisibleInputs = () => {
  console.log('starting...');
  return dispatch => {
    console.log('getting tabs');
    browser.tabs
      .query({currentWindow: true, active: true})
      .then(tabs => {
        console.log('getting listOfVisibleInputNames');
        browser.tabs
          .sendMessage(tabs[0].id, {
            command: 'GET_ALL_VISIBLE_INPUT_NAMES',
          })
          .then(listOfVisibleInputNames => {
            console.log('listOfVisibleInputNames');
            console.log(listOfVisibleInputNames);
            console.log(typeof listOfVisibleInputNames);
            dispatch({
              type: GET_ALL_VISIBLE_INPUT_NAMES,
              payload: {listOfVisibleInputNames},
            });
          })
          .catch(err => console.log(`Error Getting List:\n${err}`));
      })
      .catch(err => console.log(`Error Getting Tabs:\n${err}`));
  };
};
