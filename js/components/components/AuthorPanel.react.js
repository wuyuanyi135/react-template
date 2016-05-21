import * as actions from '../../actions/ImportFormActions.js';
import { connect } from 'react-redux';
import React from 'react';
import {
    ListGroup,
    ListGroupItem,
    FormControl,
    ControlLabel,
    FormGroup,
    Panel
} from 'react-bootstrap';
import _ from 'lodash';

const AuthorPanel = (props) => {
    const dispatch = props.dispatch;
    const authors = props.authors;
    const affiliation = props.affiliation ? props.affiliation : [];
    const selectedAffiliation = props.selectedAffiliation;
    return (
        <Panel header="作者" className="author-panel form-panel">
            <FormGroup
              className="form-panel-content"
              validationState={authors?'success':'error'}>
                <ControlLabel>作者</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Authors"
                  onChange={e => dispatch(actions.changeAuthors(e.target.value))}
                  value={authors}
                />
            </FormGroup>
            {affiliation.length ? (
                <FormGroup className="form-panel-content">
                    <ControlLabel>所属单位列表 (点击选择)</ControlLabel>
                    <ListGroup>
                        {
                            _(affiliation)
                            .uniq()
                            .omitBy(_.isNull)
                            .values()
                            .value()
                            .map((aff, index) =>
                                <ListGroupItem
                                  key={index}
                                  onClick={e => dispatch(
                                      actions.changeAffiliationSelection(e.target.textContent)
                                  )}
                                >{aff}</ListGroupItem>)}
                    </ListGroup>
                </FormGroup>) : null
            }
            <FormGroup
              className="form-panel-content"
              validationState={selectedAffiliation?'success':'error'}>
                <ControlLabel>所属单位 (可编辑)</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Affiliation"
                  onChange={e => dispatch(actions.changeAffiliationSelection(e.target.value))}
                  value={selectedAffiliation}
                />
            </FormGroup>
        </Panel>
    );
};


function select(state) {
    return {
        authors: state.importForm.data.authors,
        affiliation: state.importForm.data.affiliation,
        selectedAffiliation: state.importForm.data.selectedAffiliation
    };
}
module.exports = connect(select)(AuthorPanel);
