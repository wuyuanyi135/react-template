import React, { Component } from 'react';
import {
    Modal
} from 'react-bootstrap';
import OutputPanel from './OutputPanel.react.js';
import EntryForm from '../components/EntryForm.react.js';
import { connect } from 'react-redux';
import * as indexActions from '../../actions/IndexActions.js';
import * as importActions from '../../actions/ImportFormActions.js';
import { fetchRecent } from '../../actions/AppActions.js';

class DetailDialog extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentWillUnmount() {
        this.props.dispatch(fetchRecent(false));
    }
    render() {
        const props = this.props;
        const show = props.show;
        const dispatch = props.dispatch;
        return (
            <div>

                <Modal
                  dialogClassName="popup"
                  show={show}
                  bsSize="large"
                  onHide={(arg) => {
                      if (confirm('是否放弃编辑')) {
                          dispatch(indexActions.displayDialog(false));
                      }
                  }}
                >
                    <Modal.Header>
                        <Modal.Title>详情页</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EntryForm />
                        <OutputPanel />
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
