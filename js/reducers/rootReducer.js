/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import homeReducer from './homeReducer';
import importReducer from './importReducer';
// Replace line below once you have several reducers with
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
const rootReducer = combineReducers({
    home:homeReducer,
    importForm:importReducer,
    routing: routerReducer
})
// const rootReducer = {homeReducer};

export default rootReducer;
