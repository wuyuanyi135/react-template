import * as constants from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

const initialState = {
    pmid: null
}

function importReducer(state = initialState, action) {
    switch (action.type) {
        case constants.SET_IMPORT_FORM_STATE:
            if (typeof action.newState === "object") {
                return assignToEmpty(action.newState);
            } else {
                // reset state
                return assignToEmpty(initialState);
            }
            break;
        
        default:
            return state;
    }
}

export default importReducer;