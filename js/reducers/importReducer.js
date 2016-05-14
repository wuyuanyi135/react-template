import * as constants from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import _ from 'lodash';
const initialState = {
    data: {
        pmid: "",
        authors: "",
        affiliation: [],
        selectedAffiliation: ""
    },
    isLoading: false
}

function importReducer(state = initialState, action) {
    switch (action.type) {

        case constants.SET_IMPORT_FORM_STATE:
            if (typeof action.newState === "object") {
                return _.merge({}, state, action.newState); // resursively change the object
            } else {
                // reset state
                return assignToEmpty(initialState);
            }
            break;


        case constants.CHANGE_IMPORT_FORM_PMID:
            return _.merge({}, state, {data:{pmid: action.pmid}});
            break;


        case constants.CHANGE_IMPORT_FORM_LOADING_STATE:
            return _.merge({}, state, {isLoading: action.isLoading});
            break;

        case constants.CHANGE_IMPORT_FORM_AUTHORS:
            return _.merge({}, state, {data: {authors: action.authors}});
            break;


        case constants.CHANGE_IMPORT_FORM_SELECTED_AFFILIATION:
            return _.merge({}, state, {data:{ selectedAffiliation: action.selectedAffiliation}})
        default:
            return state;
    }
}

export default importReducer;
