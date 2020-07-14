// import {
//   GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
//   GET_ALL_VISIBLE_TEXT_INPUTS_NAME_SUCCESS,
// } from '../constants/input';

// const initialState = {
//   visibleInputs: [],
// };

// export default (state = initialState, actions) => {
//   switch (actions.type) {
//     case GET_ALL_VISIBLE_TEXT_INPUTS_NAME:
//       return state;
//     case GET_ALL_VISIBLE_TEXT_INPUTS_NAME_SUCCESS:
//       return {
//         listOfVisibleInputNames: actions.payload.listOfVisibleInputNames,
//       };
//     default:
//       return state;
//   }
// };

import {GET_ALL_VISIBLE_TEXT_INPUTS_NAME} from '../constants/input';

const initialState = {
  visibleTextInputs: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_VISIBLE_TEXT_INPUTS_NAME:
      return {
        visibleTextInputs: actions.payload.visibleTextInputs,
      };
    default:
      return state;
  }
};
