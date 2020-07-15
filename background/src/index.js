import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {rootReducer} from './rootReducers';

import {wrapStore} from 'webext-redux';

let initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

wrapStore(store);
