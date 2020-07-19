import {
  GET_STORED_INPUTS,
  UPDATE_VISIBLE_TEXT_INPUT,
  IMPORT_JSON,
  OPEN_IMPORT_JSON,
  CLOSE_IMPORT_JSON,
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
    case OPEN_IMPORT_JSON:
      return Object.assign({}, state, {
        importing: true,
      });
    case CLOSE_IMPORT_JSON:
      return Object.assign({}, state, {
        importing: false,
      });
    case IMPORT_JSON:
      console.log('IMPORT_JSON');
      return Object.assign({}, state, {
        data: actions.payload.data,
        importing: false,
      });
    default:
      return state;
  }
};
