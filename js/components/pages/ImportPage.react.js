import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import EntryForm from '../components/EntryForm.react.js';
import * as actions from '../../actions/ImportFormActions.js';
import _ from 'lodash';

const validateForm = (data) => (
    _.every([
        data.authors,
        // data.pmid,
        data.selectedISSN,
        data.selectedPublicationTypes,
        data.selectedAffiliation,
        data.source,
        data.articleTitle
    ])
);

class ImportPage extends Component {
    componentDidMount() {
        this.props.dispatch(actions.setImportFormState());  // clear texts
    }
    render() {
        const props = this.props;
        return (
            <div>
                <h1>导入</h1>
                <EntryForm />
                <Button
                  bsStyle="primary"
                  className="import-form-submit"
                  disabled={!validateForm(props.data)}
                  onClick={() => props.dispatch(actions.submitImportFormAsync(props.frm))}
                >
                    添加条目
                </Button>
            </div>
        );
    }
}

function select(state) {
    return {
        data: state.importForm.data,
        frm: state.importForm
    };
}

export default connect(select)(ImportPage);
