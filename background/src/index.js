// import {createStore, applyMiddleware} from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';

// import {rootReducer} from './rootReducers';
// import rootSagas from './rootSagas';

// import {wrapStore} from 'webext-redux';

// initialState = {};

// const ReduxSaga = createSagaMiddleware();

// const middlewares = [thunk, ReduxSaga];

// const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

// const store = createStore(rootReducer, initialState, composeEnhancers);

// ReduxSaga.run(rootSagas);

// wrapStore(store);

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';

import {rootReducer} from './rootReducers';

import {wrapStore} from 'webext-redux';

let initialState = {};

// const middlewares = [thunk];

// const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

// const store = createStore(rootReducer, initialState, composeEnhancers);

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

wrapStore(store);
