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
                dispatch(setImportFormData(mappedData));
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

export function setImportFormData(data) {
    return { type: constants.SET_IMPORT_FORM_DATA, data };
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
export function addNewApplicant(applicant = constants.INIT_APPLICANT) {
    return {
        type: constants.ADD_NEW_APPLICANT,
        applicant
    };
}
export function removeApplicant(index) {
    return {
        type: constants.REMOVE_APPLICANT,
        index
    };
}

export function changeApplicantNamePinyin(applicantPinyin, index) {
    return {
        type: constants.CHANGE_IMPORT_FORM_APPLICANT_NAME_PINYIN,
        applicantPinyin,
        index
    };
}

export function changeApplicantName(name, index) {
    return dispatch => {
        const namePinyin = pinyin(name).reduce((p, c) => `${p} ${c}`, '');
        dispatch(changeApplicantNamePinyin(namePinyin, index));
        dispatch({
            type: constants.CHANGE_IMPORT_FORM_APPLICANT_NAME,
            name,
            index
        });
    };
}

export function changeApplicantDepartmentPinyin(departmentPinyin, index) {
    return {
        type: constants.CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT_PINYIN,
        departmentPinyin,
        index
    };
}

export function changeApplicantDepartment(department, index) {
    return dispatch => {
        const dpPinyin = pinyin(department).reduce((p, c) => `${p} ${c}`, '');
        dispatch(changeApplicantDepartmentPinyin(dpPinyin, index));
        dispatch({
            type: constants.CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT,
            department,
            index
        });
    };
}

export function changeISSNSelection(issn) {
    return {
        type: constants.CHANGE_IMPORT_FORM_SELECTED_ISSN,
        issn
    };
}

export function changePTSelection(pt) {
    return {
        type: constants.CHANGE_IMPORT_FORM_SELECTED_PT,
        pt
    };
}

export function changeArticleTitle(title) {
    return {
        type: constants.CHANGE_IMPORT_FORM_ARTICLE_TITLE,
        title
    };
}

export function updateSciTable(sci) {
    return {
        type: constants.UPDATE_SCI_TABLE,
        sci
    };
}

export function changeIsUpdatingSciTableState(state) {
    return {
        type: constants.CHANGE_IS_UPDATING_SCI,
        state
    };
}

export function updateSci(issn) {
    return dispatch => {
        dispatch(changeIsUpdatingSciTableState(true));
        reqwest({
            url: `/api/sciserver?action=queryissn&issn=${issn}`,
            method: 'get'
        })
        .then((value) => {
            console.log('Fetched SCI', value);
            var response;
            try {
                response = JSON.parse(value.response);
            } catch (err) {
                console.error('Can not parse fetched sci data', err);
                dispatch(actions.addWarningNotification('无法解析返回的SCI数据', 3000));
                return;
            }
            if (response.status !== 'success') {
                dispatch(actions.addWarningNotification('获取失败 正在重新登陆 请等待登陆成功后再次获取', 3000));
                reqwest('/api/sciserver?action=login')
                .then(_value => {
                    if (_value.status === 'success') {
                        dispatch(actions.addDefaultNotification('已经重新登陆', 3000));
                    } else {
                        dispatch(actions.addDefaultNotification('重新登陆失败', 3000));
                        console.error('relogin failed', _value);
                    }
                });
                return;
            }

            try {
                dispatch(updateSciTable(response.result));
                dispatch(actions.addDefaultNotification('获取成功', 3000));
            } catch (e) {
                dispatch(actions.addWarningNotification('获取失败 数据不正确', 3000));
                console.log('Failed Fetching SCI', e);
            }
        })
        .fail((error) => {
            console.log('Failed Fetching SCI', error);
            dispatch(actions.addWarningNotification('获取失败 连接失败或ISSN不存在', 3000));
        })
        .always(() => dispatch(changeIsUpdatingSciTableState(false)));
    };
}

/* submit import form */
export function submitImportFormAsync(data) {
    return (dispatch, getState) => {
        let asset = data;
        // validation has been done by ui
        if (!asset) {
            console.log('[submitImportFormAsync] data not provided, use importForm data');
            asset = getState().importForm.data;
            console.log(asset);
        }
        reqwest({
            type: 'json',
            method: 'post',
            url: '/api/import',
            contentType: 'application/json',
            data: JSON.stringify(asset)
        })
        .then((value) => {
            console.log('Created documents', value);
            dispatch(actions.addDefaultNotification('导入成功!', 5000));
        })
        .fail((error) => {
            console.log('Create failed', error);
            dispatch(actions.addWarningNotification(`导入失败: ${JSON.parse(error.responseText).message}`, 5000));
        });
    };
}
