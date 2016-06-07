import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryForm from '../components/EntryForm.react.js';
import { ImportButton } from '../components/ImportButton.react.js';
import * as actions from '../../actions/ImportFormActions.js';


class ImportPage extends Component {
    componentDidMount() {
        this.props.dispatch(actions.setImportFormState());  // clear texts
    }
    render() {
        const { data } = this.props;
        return (
            <div>
                <h1>导入</h1>
                <EntryForm />
                <ImportButton data={data} />
            </div>
        );
    }
}

function select(state) {
    return {
        data: state.importForm.data,
    };
}

export default connect(select)(ImportPage);
