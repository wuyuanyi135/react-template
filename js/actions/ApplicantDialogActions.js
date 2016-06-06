import * as constants from '../constants/AppConstants';

export function changeApplicant(applicantName) {
    return {
        type: constants.CHANGE_APPLICANT_DIALOG_WHO,
        applicantName
    };
}

export function displayDialog(state, applicantName) {
    return dispatch => {
        if (applicantName) {
            dispatch(changeApplicant(applicantName));
        }
        dispatch({
            type: constants.DISPLAY_APPLICANT_DIALOG,
            state
        });
    };
}
