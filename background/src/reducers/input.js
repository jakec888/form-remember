import {GET_STORED_INPUTS, UPDATE_VISIBLE_TEXT_INPUT} from '../constants/input';

const initialState = {
  data: [],
  visibleTextInputs: {},
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_STORED_INPUTS:
      return {
        data: actions.payload.data,
        visibleTextInputs: actions.payload.visibleTextInputs,
      };
    case UPDATE_VISIBLE_TEXT_INPUT:
      return Object.assign({}, state, {
        visibleTextInputs: actions.payload.visibleTextInputs,
      });
    default:
      return state;
  }
};
