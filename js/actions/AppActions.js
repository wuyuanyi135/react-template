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
import pinyin from 'pinyinlite';
import _ from 'lodash';
import { mapMedline } from '../utils/mapMedline';

export function changeProjectName(name) {
    return { type: constants.CHANGE_PROJECT_NAME, name };
}

export function changeOwnerName(name) {
    return { type: constants.CHANGE_OWNER_NAME, name };
}

export function changeTest(message) {
    return { type: constants.CHANGE_TEST, message };
}

/**
 * Notification Actions
 */

export function addNotification(notification) {
    return { type: constants.ADD_NOTIFICATION, notification };
}

export function removeNotification(notification) {
    return { type: constants.REMOVE_NOTIFICATION, notification };
}


/* Helpers */
export function addDefaultNotification(message, timeout) {
    return addNotification({
        message,
        key: Date.now(),
        className: 'default-notification',
        dismissAfter: timeout
    });
}
export function addWarningNotification(message, timeout) {
    return addNotification({
        message,
        key: Date.now(),
        className: 'warning-notification',
        dismissAfter: timeout,
        barStyle: {
            background: '#ffcc00',
            color: 'black',
            fontWeight: 'bold'
        }
    });
}
export function updateRecentExport(recentExport) {
    return {
        type: constants.UPDATE_RECENT_EXPORT,
        recentExport
    };
}

export function updateRecentImport(newList) {
    return {
        type: constants.UPDATE_RECENT_IMPORT,
        recentImport: newList
    };
}

export function fetchRecent(showNotification = true) {
    return dispatch => {
        reqwest({
            url: '/api/service/history?$limit=3&$sort[createdAt]=-1',
            method: 'get',
        })
        .then(value => {
            if (showNotification) {
                dispatch(addDefaultNotification('最近打印 列表已更新', 3000));
            }
            dispatch(updateRecentExport(value));
        })
        .fail(err => {
            dispatch(addWarningNotification('最近打印列表更新失败', 3000));
            console.error(err);
        });

        reqwest({
            url: '/api/service/entry?$limit=3&$sort[createdAt]=-1',
            method: 'get'
        })
        .then(value => {
            if (showNotification) {
                dispatch(addDefaultNotification('最近添加 列表已更新', 3000));
            }
            dispatch(updateRecentImport(value));
        })
        .fail(err => {
            dispatch(addWarningNotification('列表更新失败', 3000));
            console.error(err);
        });
    };
}
