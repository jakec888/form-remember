/*

This is the Background

runs in the background and where persistent data is stored

using background to hold our single source of truth (redux) data store

*/

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {rootReducer} from './rootReducers';

import {wrapStore} from 'webext-redux';

let initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

wrapStore(store);
