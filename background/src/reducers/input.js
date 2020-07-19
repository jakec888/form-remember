import {
  GET_STORED_INPUTS,
  UPDATE_VISIBLE_TEXT_INPUT,
  IMPORT_JSON,
} from '../constants/input';

const initialState = {
  data: [],
  visibleTextInputs: {},
  importing: false,
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
    case IMPORT_JSON:
      return Object.assign({}, state, {
        importing: actions.payload.importing,
      });
    default:
      return state;
  }
};
