import {
  GET_STORED_INPUTS,
  GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
} from '../constants/input';

export const getStoreInputs = data => ({
  type: GET_STORED_INPUTS,
  payload: {data},
});

export const getAllVisibleInputs = visibleTextInputs => ({
  type: GET_ALL_VISIBLE_TEXT_INPUTS_NAME,
  payload: {visibleTextInputs},
});
