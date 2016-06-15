import * as constants from '../constants/AppConstants.js';
import { addWarningNotification, addDefaultNotification } from '../actions/AppActions.js';
import { displayDialog, updateFormData } from '../actions/IndexActions.js';
import reqwest from 'reqwest';
import _ from 'lodash';

export function changeApplicantSelection(selection) {
    return {
        type: constants.CHANGE_SELECTED_APPLICANT,
        selection
    };
}

export function changeSciSelection(selection) {
    return {
        type: constants.CHANGE_SELECTED_SCI,
        selection
    };
}

export function deleteEntry(id) {
    return (dispatch) => {
        if (!id) {
            addWarningNotification('删除失败 (ID)');
            return;
        }
        if (confirm("确认删除？")) {
            const p1 = reqwest({
                method: 'delete',
                url: `/api/service/entry/${id}`
            })
            .fail(error => {throw error});
            const p2 = reqwest({
                method: 'delete',
                url: `/api/service/history?refId=${id}`
            })
            .fail(error => {throw error});

            Promise.all([p1, p2])
            .then(value => {
                dispatch(displayDialog(false));
                dispatch(addDefaultNotification('删除成功'));
                console.log('[exportActions] Deleted', value);
            })
            .catch(err => {
                dispatch(addWarningNotification('删除失败'));
                console.error('[exportActions] Delete Failed', err);
            });
        }
    };
}
export function exportPrintPage() {
    return (dispatch, getState) => {
        const state = getState();
        const data = state.importForm.data;
        const exportData = state.exportForm;
        const query = {
            applicant: _.get(exportData, 'selectedApplicant.applicant', ''),
            department:  _.get(exportData, 'selectedApplicant.department', ''),
            authors: data.authors,
            title: data.articleTitle,
            source: data.source,
            issn: data.selectedISSN,
            address: data.selectedAffiliation,
            pt: data.selectedPublicationTypes,
            pmid: data.pmid,
            year: _.get(exportData, 'selectedSci.year', ''),
            impact: _.get(exportData, 'selectedSci.impact', ''),
            section: _.get(exportData, 'selectedSci.section', '')
        };
        const queryString = $.param(query);
        reqwest({
            url: '/api/service/history',
            method: 'post',
            contentType: 'application/json',
            type: 'json',
            data: JSON.stringify({ refId: data._id })
        });
        dispatch(updateFormData(data._id));
        dispatch(displayDialog(false));
        window.open(`/print.html?${queryString}`, '_blank');
    };
}
