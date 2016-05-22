/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import * as constants from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import {OrderedSet} from 'immutable';
import _ from 'lodash';
const initialState = {
  notifications: OrderedSet(),
  recentImport: []
};

function homeReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case constants.ADD_NOTIFICATION:
        return assignToEmpty(state, {
            notifications: state.notifications.add(action.notification)
        });

    case constants.REMOVE_NOTIFICATION:
        return assignToEmpty(state, {
            notifications: state.notifications.delete(action.notification)
        });

    case constants.UPDATE_RECENT_IMPORT:
        return _.assign({}, state, {
            recentImport: action.recentImport
        });
        
    default:
      return state;
  }
}

export default homeReducer;
