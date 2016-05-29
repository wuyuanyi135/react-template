import React, { Component } from 'react';
import {
    Modal
} from 'react-bootstrap';
import OutputPanel from './OutputPanel.react.js';
import EntryForm from '../components/EntryForm.react.js';
import { connect } from 'react-redux';
import * as indexActions from '../../actions/IndexActions.js';
import * as importActions from '../../actions/ImportFormActions.js';

class DetailDialog extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const props = this.props;
        const show = props.show;
        const dispatch = props.dispatch;
        return (
            <div>
                <Modal
                  show={show}
                  onHide={() => {
                      dispatch(indexActions.displayDialog(false));
                  }}
                >
                    <Modal.Header>
                        <Modal.Title>详情页</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <OutputPanel />
                        <EntryForm />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

DetailDialog.propTypes = {
    show: React.PropTypes.bool,
    entryID: React.PropTypes.object
};
DetailDialog.defaultProps = {
    show: true,
    entryID: {}
};


module.exports = connect()(DetailDialog);
