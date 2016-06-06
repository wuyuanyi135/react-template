import React, { Component } from 'react';
import {
    Modal
} from 'react-bootstrap';
import OutputPanel from './OutputPanel.react.js';
import EntryForm from '../components/EntryForm.react.js';
import { connect } from 'react-redux';
import * as indexActions from '../../actions/IndexActions.js';
import * as importActions from '../../actions/ImportFormActions.js';
import * as applicantDialogActions from '../../actions/ApplicantDialogActions.js';
class ApplicantDialog extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { show, dispatch, who } = this.props;
        return (
            <div>

                <Modal
                  show={show}
                  onHide={() => {
                      dispatch(applicantDialogActions.displayDialog(false));
                  }}
                >
                    <Modal.Header>
                        <Modal.Title>申请人: {who}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
ApplicantDialog.defaultProps = {
    show: true,
    entryID: {}
};
module.exports = connect()(ApplicantDialog);
