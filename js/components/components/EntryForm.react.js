import React from 'react';
import PMIDPanel from './PMIDPanel.react';
import ApplicantPanel from './ApplicantPanel.react.js';
import AuthorPanel from './AuthorPanel.react';
import ArticleInfoPanel from './ArticleInfoPanel.react.js';
import * as actions from '../../actions/AppActions';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

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
              onClick={() => actions.submitImportForm(props.data)}
            >
                添加条目
            </Button>
        </form>
    </div>
);

function select(state) {
    return {
        data: state.importForm.data
    };
}
export default connect(select)(EntryForm);
