import * as actions from '../../actions/ImportFormActions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import _ from 'lodash';
import SciTable from './SciTable.react.js';
import {
    FormControl,
    ControlLabel,
    FormGroup,
    Panel,
    ListGroup,
    ListGroupItem,
    Button,
    ButtonGroup
} from 'react-bootstrap';

class IssnPanel extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        };
    }
    validateIssn() {
        return this.props.selectedISSN ? 'success' : 'error';
    }
    validatePanel() {
        return _.every([
            this.validateIssn()
        ],
        (item) => item === 'success')
        ? 'success' : 'warning';
    }
    render() {
        const props = this.props;
        const { issn, selectedISSN, dispatch, ...panelProps } = props;
        const validation = this.validatePanel();
        return (
            <Panel
              {...panelProps}
              onMouseOver={() => this.setState({ expanded: true })}
              onMouseLeave={() => this.setState({ expanded: false })}
              expanded={this.state.expanded || this.props.alwaysOn || validation === 'warning'}
              bsStyle={validation}
              className="issn-panel form-panel"
            >
                <div className="form-panel-content">
                    {
                        issn.length ?
                        <FormGroup>
                            <ControlLabel className="controllabel-blk">ISSN 列表 (PubMed)</ControlLabel>
                            <ButtonGroup className="block">
                                {
                                    issn.map((item, index) => (
                                        <Button
                                          key={index}
                                          onClick={e => dispatch(actions.changeISSNSelection(item.issn))}
                                        >
                                            {item.issnType}: {item.issn}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>
                        </FormGroup>
                        : null
                    }
                    <FormGroup validationState={selectedISSN ? 'success' : 'error'}>
                        <ControlLabel>ISSN 选择</ControlLabel>
                        <FormControl
                          type="text"
                          value={selectedISSN}
                          placeholder="selectedISSN"
                          onChange={e => dispatch(actions.changeISSNSelection(e.target.value))}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>分区/SCI</ControlLabel>
                        <SciTable />
                    </FormGroup>
                </div>
            </Panel>
        );
    }
}
IssnPanel.defaultProps = {
    alwaysOn: true
};
module.exports = connect()(IssnPanel);
