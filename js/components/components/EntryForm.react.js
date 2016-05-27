import React from 'react';
import PMIDPanel from './PMIDPanel.react';
import ApplicantPanel from './ApplicantPanel.react.js';
import AuthorPanel from './AuthorPanel.react';
import ArticleInfoPanel from './ArticleInfoPanel.react.js';
import * as actions from '../../actions/ImportFormActions.js';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

const validateForm = (data) => (
    _.every ([
        data.authors,
        data.pmid,
        data.selectedISSN,
        data.selectedPublicationTypes,
        data.selectedAffiliation,
        data.source,
        data.articleTitle
    ])
);
const EntryForm = (props) => (
    <div>
        <form>
            <ApplicantPanel />
            <PMIDPanel />
            <AuthorPanel />
            <ArticleInfoPanel />
            <Button
              bsStyle="primary"
              className="import-form-submit"
              disabled={!validateForm(props.data)}
              onClick={() => props.dispatch(actions.submitImportFormAsync(props.frm))}
            >
                添加条目
            </Button>
        </form>
    </div>
);

function select(state) {
    return {
        data: state.importForm.data,
        frm : state.importForm
    };
}
export default connect(select)(EntryForm);
