/**
 * This reducer extends import reducer and provides TODO:
 */
import * as constants from '../constants/AppConstants';
import _ from 'lodash';
export const initialState = {
    selectedApplicant: {},
    selectedSci: {}
};

export function exportReducer(state = initialState, action) {
    switch (action.type) {
    case constants.CHANGE_SELECTED_APPLICANT:
        return _.assign({}, state, { selectedApplicant: action.selection });
    case constants.CHANGE_SELECTED_SCI:
        return _.assign({}, state, { selectedSci: action.selection });
    default:
        return state;
    }
}
