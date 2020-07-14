// import {all, takeEvery, put, call} from 'redux-saga/effects';

// import {GET_ALL_VISIBLE_INPUT_NAMES} from '../constants/input';
// import {getAllVisibleInputsSuccess} from '../actions/inputs';

// import browser from 'webextension-polyfill';

// const onTabsRequest = () => {
//   let tabs = browser.tabs.query({currentWindow: true, active: true});

//   return tabs;
// };

// const onVisibleInputRequest = tabs => {
//   let listOfVisibleInputNames = browser.tabs.sendMessage(tabs[0].id, {
//     command: GET_ALL_VISIBLE_INPUT_NAMES,
//   });

//   return listOfVisibleInputNames;
// };

// export function* getInputsAsync() {
//   const tabs = yield call(onTabsRequest);

//   const listOfVisibleInputNames = yield call(onVisibleInputRequest, tabs);

//   yield put(getAllVisibleInputsSuccess(listOfVisibleInputNames));
// }

// export default function* rootSaga() {
//   yield all([takeEvery(GET_ALL_VISIBLE_INPUT_NAMES, getInputsAsync)]);
// }
