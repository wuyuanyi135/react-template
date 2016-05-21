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

/* Entry form actions */

export function updateImportFormAsync(pmid) {
    return (dispatch) => {
        if (!pmid) {
            dispatch(addWarningNotification('未填写PMID', 5000));
            return;
        }
        /* set isLoading = true */
        dispatch(setImportFormLoadingState(true));
        reqwest(`/api/query/pmid/${pmid}`)
            .then((resp) => {
                dispatch(addDefaultNotification('加载成功！', 4000));
                // TODO: potential break when backend key changes.
                const mappedData = mapMedline(resp);
                dispatch(setImportFormState({ data: mappedData }));
                /* Affiliation Stuff */
                const firstAffiliation = _.castArray(resp.AD)[0];
                if (firstAffiliation) {
                    // Select the first candidate
                    dispatch(changeAffiliationSelection(firstAffiliation));
                } else {
                    dispatch(addWarningNotification('请手动填写附属单位', 4000));
                }

                const firstISSN = _.castArray(mappedData.issn)[0].issn
                if (firstISSN) {
                    dispatch(changeISSNSelection(firstISSN));
                }
            })
            .fail((err) => {
                // todo: backend server should use statusText for consistency!
                const msg = err.responseText ? err.responseText : err.statusText;

                dispatch(
                    addWarningNotification(`加载失败：${msg}`, 5000)
                );
                console.log(err);
            })
            .always(() => {
                dispatch(setImportFormLoadingState(false));
            });
    };
}

/**
 * set all state of importForm
 * @method setImportFormState
 * @param  {object}           state     object contains newState
 */
export function setImportFormState(state) {
    return { type: constants.SET_IMPORT_FORM_STATE, newState: state };
}

export function setImportFormPMID(pmid) {
    return { type: constants.CHANGE_IMPORT_FORM_PMID, pmid };
}

/**
 * set the loading state of import form
 * @method setImportFormLoadingState
 * @param  {bool}                  state set the state to `state`
 */
export function setImportFormLoadingState(state) {
    return { type: constants.CHANGE_IMPORT_FORM_LOADING_STATE, isLoading: state };
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


/**
 * Author section
 */
export function changeAuthors(text) {
    return {
        type: constants.CHANGE_IMPORT_FORM_AUTHORS,
        authors: text
    };
}

/**
 * Affiliation section
 */
export function changeAffiliationSelection(text) {
    return {
        type: constants.CHANGE_IMPORT_FORM_SELECTED_AFFILIATION,
        selectedAffiliation: text
    };
}


/* Article Info section */
export function changeSource(text) {
    return {
        type: constants.CHANGE_IMPORT_FORM_SOURCE,
        source: text
    };
}


/* Applicant section */
export function changeApplicantName(name) {
    return dispatch => {
        const namePinyin = pinyin(name).reduce((p, c) => `${p} ${c}`, '');
        dispatch(changeApplicantNamePinyin(namePinyin));
        dispatch({
            type: constants.CHANGE_IMPORT_FORM_APPLICANT_NAME,
            name
        });
    };
}

export function changeApplicantNamePinyin(applicantPinyin) {
    return {
        type: constants.CHANGE_IMPORT_FORM_APPLICANT_NAME_PINYIN,
        applicantPinyin
    };
}

export function changeApplicantDepartmentPinyin(departmentPinyin) {
    return {
        type: constants.CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT_PINYIN,
        departmentPinyin
    };
}

export function changeApplicantDepartment(department) {
    return dispatch => {
        const dpPinyin = pinyin(department).reduce((p, c) => `${p} ${c}`, '');
        dispatch(changeApplicantDepartmentPinyin(dpPinyin));
        dispatch({
            type: constants.CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT,
            department
        });
    };
}

export function changeISSNSelection (issn) {
    return {
        type: constants.CHANGE_IMPORT_FORM_SELECTED_ISSN,
        issn
    };
}

export function changePTSelection (pt) {
    return {
        type: constants.CHANGE_IMPORT_FORM_SELECTED_PT,
        pt
    };
}

/* submit import form */
export function submitImportForm(data) {
    // TODO: need some validation here
    return dispatch => {
        reqwest('/api/import')
    };
}
