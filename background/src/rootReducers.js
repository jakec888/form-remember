import {combineReducers} from 'redux';

import inputReducers from './reducers/input';

export const rootReducer = combineReducers({
  Main: inputReducers,
});
