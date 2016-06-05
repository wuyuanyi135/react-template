import * as actions from '../../actions/ImportFormActions.js';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    ListGroup,
    ListGroupItem,
    FormControl,
    ControlLabel,
    FormGroup,
    Panel
} from 'react-bootstrap';
import _ from 'lodash';

class AuthorPanel extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        };
    }
    validateAuthor() {
        return this.props.authors ? 'success' : 'error';
    }
    validateAffiliation() {
        return this.props.selectedAffiliation ? 'success' : 'error';
    }
    validatePanel() {
        return _.every([
            this.validateAuthor(),
            this.validateAffiliation()
        ],
        (item) => item === 'success')
        ? 'success' : 'warning';
    }
    render() {
        const { authors, affiliation, selectedAffiliation, dispatch, ...panelProps } = this.props;
        const affiliationArray = affiliation || [];
        const validation = this.validatePanel();
        return (
            <Panel
              {...panelProps}
              onMouseOver={() => this.setState({ expanded: true })}
              onMouseLeave={() => this.setState({ expanded: false })}
              expanded={this.state.expanded || this.props.alwaysOn || validation === 'warning'}
              bsStyle={validation}
              header="作者"
              className="author-panel form-panel"
            >
                <FormGroup
                  className="form-panel-content"
                  validationState={this.validateAuthor()}
                >
                    <ControlLabel>作者</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Authors"
                      onChange={e => dispatch(actions.changeAuthors(e.target.value))}
                      value={authors}
                    />
                </FormGroup>
                {affiliationArray.length ? (
                    <FormGroup className="form-panel-content">
                        <ControlLabel>所属单位列表 (点击选择)</ControlLabel>
                        <ListGroup>
                            {
                                _(affiliationArray)
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
                  validationState={this.validateAffiliation()}
                >
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
    }
}
AuthorPanel.defaultProps = {
    alwaysOn: true
};
module.exports = connect()(AuthorPanel);
