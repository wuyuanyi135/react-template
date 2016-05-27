import * as constants from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import _ from 'lodash';
const initialState = {
    data: {
        pmid: '',
        authors: '',
        articleTitle: '',
        affiliation: [],
        selectedAffiliation: '',
        source: '',
        issn: [],
        selectedISSN: '',
        publicationTypes: [],
        selectedPublicationTypes: ''
    },
    applicant: {
        department: '',
        applicant: '',
        departmentPinyin: '',
        applicantPinyin: ''
    },
    isLoading: false
};

function importReducer(state = initialState, action) {
    switch (action.type) {

    case constants.SET_IMPORT_FORM_STATE:
        if (typeof action.newState === 'object') {
            return _.assign({}, state, action.newState); // resursively change the object
        }
        // reset state
        return assignToEmpty(initialState);
        // break;


    case constants.CHANGE_IMPORT_FORM_PMID:
        return _.merge({}, state, { data: { pmid: action.pmid } });


    case constants.CHANGE_IMPORT_FORM_LOADING_STATE:
        return _.merge({}, state, { isLoading: action.isLoading });


    case constants.CHANGE_IMPORT_FORM_AUTHORS:
        return _.merge({}, state, { data: { authors: action.authors } });


    case constants.CHANGE_IMPORT_FORM_SELECTED_AFFILIATION:
        return _.merge({}, state, { data: { selectedAffiliation: action.selectedAffiliation } });


    case constants.CHANGE_IMPORT_FORM_SOURCE:
        return _.merge({}, state, { data: { source: action.source } });

    case constants.CHANGE_IMPORT_FORM_ARTICLE_TITLE:
        return _.merge({}, state, { data: { articleTitle: action.title } });
    // Applicant
    case constants.CHANGE_IMPORT_FORM_APPLICANT_NAME:
        return _.merge({}, state, { applicant: { applicant: action.name } });

    case constants.CHANGE_IMPORT_FORM_APPLICANT_NAME_PINYIN:
        return _.merge({}, state, { applicant: { applicantPinyin: action.applicantPinyin } });

    case constants.CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT:
        return _.merge({}, state, { applicant: { department: action.department } });

    case constants.CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT_PINYIN:
        return _.merge({}, state, { applicant: { departmentPinyin: action.departmentPinyin } });

    case constants.CHANGE_IMPORT_FORM_SELECTED_PT:
        return _.merge({}, state, { data: { selectedPublicationTypes: action.pt } });

    case constants.CHANGE_IMPORT_FORM_SELECTED_ISSN:
        return _.merge({}, state, { data: { selectedISSN: action.issn } });

    default:
        return state;
    }
}

export default importReducer;
