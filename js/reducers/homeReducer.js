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

const initialState = {
  projectName: 'React.js Boilerplate',
  ownerName: 'mxstbr',
  test: "yes, I am a test?",
  notifications: OrderedSet()
};

function homeReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case constants.CHANGE_TEST:
      return assignToEmpty(state,{
        test: action.message
      });
    case constants.CHANGE_OWNER_NAME:
      return assignToEmpty(state, {
        ownerName: action.name
      });
    case constants.CHANGE_PROJECT_NAME:
      return assignToEmpty(state, {
        projectName: action.name
      });
    case constants.ADD_NOTIFICATION:
        return assignToEmpty(state, {
            notifications: state.notifications.add(action.notification)
        });
        break;
    case constants.REMOVE_NOTIFICATION:
        return assignToEmpty(state, {
            notifications: state.notifications.delete(action.notification)
        });
        break;
    default:
      return state;
  }
}

export default homeReducer;
