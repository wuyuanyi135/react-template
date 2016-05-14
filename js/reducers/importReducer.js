import * as constants from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import _ from 'lodash';
const initialState = {
    data: {
        pmid: ""
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

            
        default:
            return state;
    }
}

export default importReducer;
