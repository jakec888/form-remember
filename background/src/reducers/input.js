// import {
//   GET_ALL_VISIBLE_INPUT_NAMES,
//   GET_ALL_VISIBLE_INPUT_NAMES_SUCCESS,
// } from '../constants/input';

// const initialState = {
//   visibleInputs: [],
// };

// export default (state = initialState, actions) => {
//   switch (actions.type) {
//     case GET_ALL_VISIBLE_INPUT_NAMES:
//       return state;
//     case GET_ALL_VISIBLE_INPUT_NAMES_SUCCESS:
//       return {
//         listOfVisibleInputNames: actions.payload.listOfVisibleInputNames,
//       };
//     default:
//       return state;
//   }
// };

import {GET_ALL_VISIBLE_INPUT_NAMES} from '../constants/input';

const initialState = {
  visibleInputs: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ALL_VISIBLE_INPUT_NAMES:
      return {
        listOfVisibleInputNames: actions.payload.listOfVisibleInputNames,
      };
    default:
      return state;
  }
};
