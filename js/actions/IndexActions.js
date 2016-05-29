import * as constants from '../constants/AppConstants';
import * as homeActions from './AppActions.js';
import * as importActions from './ImportFormActions.js';
import { List } from 'immutable';
import reqwest from 'reqwest';
import _ from 'lodash';

export function displayDialog(display) {
    return {
        type: constants.DISPLAY_DIALOG,
        display
    };
}
export function displayArticleDialog(id) {
    return dispatch => {
        function displayError(err) {
            const msg = err.responseText ? err.responseText : err.statusText;
            dispatch(homeActions.addWarningNotification(msg, 5000));
            console.error(err);
        }
        // get article info
        reqwest({
            url: `/api/service/entry/${id}`,
            method: 'get'
        })
        .then(value => {
            const newValue = _.assign({}, value, { applicant: new List(value.applicant) });
            dispatch(importActions.setImportFormState());
            dispatch(importActions.setImportFormData(newValue));

            dispatch(displayDialog(true));
        })
        .fail(err => displayError(err));
    };
}

export function updateFormData(id) {
    return (dispatch, getState) => {
        // validation has been done by ui
        if (!id) {
            dispatch(homeActions.addWarningNotification('更新失败: ID 无效', 5000));
        }
        const dataToUpdate = getState().importForm.data;
        reqwest({
            type: 'json',
            method: 'put',
            url: `/api/service/entry/${id}`,
            contentType: 'application/json',
            data: JSON.stringify(dataToUpdate)
        })
        .then((value) => {
            console.log('Updated documents', value);
            dispatch(homeActions.addDefaultNotification('更新成功!', 5000));
        })
        .fail((error) => {
            console.log('Update failed', error);
            dispatch(homeActions.addWarningNotification(`导入失败: ${JSON.parse(error.responseText).message}`, 5000));
        });
    };
}
