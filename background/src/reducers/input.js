import {
  GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
  GET_STORED_INPUTS,
} from '../constants/input';

const initialState = {
  data: [],
  visibleTextInputs: [],
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_STORED_INPUTS:
      return {data: actions.payload.data};
    case GET_ALL_VISIBLE_TEXT_INPUTS_NAME:
      return {
        visibleTextInputs: actions.payload.visibleTextInputs,
      };
    default:
      return state;
  }
};
