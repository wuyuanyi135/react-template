/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import * as constants from '../constants/AppConstants';
import reqwest from 'reqwest';

export function asyncChangeProjectName(name) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(changeProjectName(name));
  };
}

export function asyncChangeOwnerName(name) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(changeOwnerName(name));
  };
}

export function changeProjectName(name) {
  return { type: constants.CHANGE_PROJECT_NAME, name };
}

export function changeOwnerName(name) {
  return { type: constants.CHANGE_OWNER_NAME, name };
}

export function changeTest(message) {
  return { type: constants.CHANGE_TEST, message}
}

/* Entry form actions */

export function updateImportFormAsync(pmid) {
    return (dispatch) => {
        if (!pmid) {
            dispatch(addWarningNotification("未填写PMID",5000));
            return;
        }
        /* set isLoading = true */
        dispatch(setImportFormLoadingState(true));
        reqwest(`/api/query/pmid/${pmid}`)
            .then((resp) => {
                dispatch(addDefaultNotification("加载成功！",4000));
                dispatch(setImportFormState({data:resp}));  // TODO: potential break when backend key changes.

            })
            .fail((err) => {
                dispatch(addWarningNotification("加载失败： " + err.statusText, 5000));  //todo: backend server should use statusText for consistency!
            })
            .always(() => {
                dispatch(setImportFormLoadingState(false));
            });
    }
}
/**
 * set all state of importForm
 * @method setImportFormState
 * @param  {object}           state     object contains newState
 */
export function setImportFormState(state) {
  return { type: constants.SET_IMPORT_FORM_STATE, newState:state };
}

export function setImportFormPMID(pmid) {
    return { type: constants.CHANGE_IMPORT_FORM_PMID, pmid:pmid};
}

/**
 * set the loading state of import form
 * @method setImportFormLoadingState
 * @param  {bool}                  state set the state to `state`
 */
export function setImportFormLoadingState(state) {
    return { type: constants.CHANGE_IMPORT_FORM_LOADING_STATE, isLoading:state};
}


/**
 * Notification Actions
 */

export function addNotification(notification) {
    return { type: constants.ADD_NOTIFICATION, notification};
}

export function removeNotification(notification) {
    return { type: constants.REMOVE_NOTIFICATION, notification};
}


/* Helpers */
export function addDefaultNotification(message, timeout) {
    return addNotification({
            message: message,
            key: Date.now(),
            className: "default-notification",
            dismissAfter: timeout
        }
    );
}
export function addWarningNotification(message, timeout) {
    return addNotification({
        message: message,
        key: Date.now(),
        className: "warning-notification",
        dismissAfter: timeout,
        barStyle: {
            background: "#ffcc00",
            color: "black",
            fontWeight: "bold"
        }
    })
}
