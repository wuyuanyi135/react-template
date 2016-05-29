import * as constants from '../constants/AppConstants';
import * as homeActions from './AppActions.js';
import * as importActions from './ImportFormActions.js';
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
        const getArticlePromise = reqwest({
            url: `/api/service/entry/${id}`,
            method: 'get'
        })
        .fail(err => displayError(err));

        const getApplicantPromise = reqwest({
            url: `/api/service/applicant?_refId=${id}`,
            method: 'get'
        })
        .fail(err => displayError(err));

        Promise.all([getApplicantPromise, getArticlePromise])
            .then(value => {
                dispatch(importActions.setImportFormState());
                dispatch(importActions.setImportFormState({ data: value[1] }));

                // do not reverse order!
                _.castArray(value[0]).map((item) => (
                    dispatch(importActions.addNewApplicant(item))
                ));
                dispatch(displayDialog(true));
            });
    };
}
