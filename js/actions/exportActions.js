import * as constants from '../constants/AppConstants.js';
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

export function exportPrintPage() {
    return (dispatch, getState) => {
        const state = getState();
        const data = state.importForm.data;
        const exportData = state.exportForm;
        const query = {
            applicant: exportData.selectedApplicant.applicant,
            department: exportData.selectedApplicant.department,
            authors: data.authors,
            title: data.articleTitle,
            source: data.source,
            issn: data.selectedISSN,
            address: data.selectedAffiliation,
            pt: data.selectedPublicationTypes,
            pmid: data.pmid,
            year: exportData.selectedSci.year,
            impact: exportData.selectedSci.impact,
            section: exportData.selectedSci.section
        };
        const queryString = $.param(query);
        window.open(`/print.html?${queryString}`, '_blank');
    };
}
