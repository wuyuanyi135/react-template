import * as constants from '../constants/AppConstants';
import * as actions from './AppActions.js';
import reqwest from 'reqwest';
import pinyin from 'pinyinlite';
import _ from 'lodash';
import { mapMedline } from '../utils/mapMedline';

/* Entry form actions */

export function updateImportFormAsync(pmid) {
    return (dispatch) => {
        if (!pmid) {
            dispatch(actions.addWarningNotification('未填写PMID', 5000));
            return;
        }
        /* set isLoading = true */
        dispatch(setImportFormLoadingState(true));
        reqwest(`/api/query/pmid/${pmid}`)
            .then((resp) => {
                dispatch(actions.addDefaultNotification('加载成功！', 4000));
                // TODO: potential break when backend key changes.
                const mappedData = mapMedline(resp);
                dispatch(setImportFormState({ data: mappedData }));
                /* Affiliation Stuff */
                const firstAffiliation = _.castArray(resp.AD)[0];
                if (firstAffiliation) {
                    // Select the first candidate
                    dispatch(changeAffiliationSelection(firstAffiliation));
                } else {
                    dispatch(actions.addWarningNotification('请手动填写附属单位', 4000));
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
                    actions.addWarningNotification(`加载失败：${msg}`, 5000)
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
export function submitImportFormAsync(data) {
    return (dispatch) => {
        // validation has been done by ui
        reqwest({
            type: 'json',
            method: 'post',
            url: '/api/import',
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
        .then((value) => {
            console.log("Created documents", value);
            dispatch(actions.addDefaultNotification("导入成功!", 5000));
        })
        .fail((error) => {
            console.log("Create failed", error);
            dispatch(actions.addWarningNotification(`导入失败: ${JSON.parse(error.responseText).message}`, 5000));
        })
    }
}
