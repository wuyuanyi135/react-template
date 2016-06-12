/**
 * PMID Panel
 * Accept state TODO: which state? to fill PMID field.
 * Have a button to trigger an action, which update the state TODO: which state
 * according to the PMID
 *
 */
import * as actions from '../../actions/ImportFormActions.js';
import React, { Component } from 'react';
import {
    Button,
    FormControl,
    ControlLabel,
    FormGroup,
    Panel,
    Glyphicon,
    InputGroup
} from 'react-bootstrap';
import { PulseLoader } from 'halogen';
import { connect } from 'react-redux';

class PMIDPanel extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        };
    }
    render() {
        const { pmid, isLoading, dispatch, ...panelProps } = this.props;
        return (
            <Panel
              {...panelProps}
              onMouseOver={() => this.setState({ expanded: true })}
              onMouseLeave={() => this.setState({ expanded: false })}
              expanded={this.state.expanded || this.props.alwaysOn}
              bsStyle="success"
              className="pmid-panel form-panel"
            >
                <FormGroup className="form-panel-content">
                    <ControlLabel>PMID</ControlLabel>
                    <InputGroup>
                        <FormGroup>
                            <FormControl
                              type="number"
                              name="pmid"
                              placeholder="PMID"
                              value={pmid}
                              onChange={e => dispatch(actions.setImportFormPMID(e.target.value))}
                              onKeyPress={e => {
                                  if (e.charCode === 13) {
                                      dispatch(actions.updateImportFormAsync(pmid));
                                  }
                              }}
                            />
                        </FormGroup>

                        <InputGroup.Button>
                            <Button
                              disabled={isLoading}
                              onClick={() => dispatch(actions.updateImportFormAsync(pmid))}
                            >{isLoading ?
                                <div className="form-loader-container">
                                    <PulseLoader size="10px" color="#bbb" />
                                </div>
                                : <div>在线获取</div>}
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>

                    {
                        pmid ?
                        (<p>
                            前往链接 <Glyphicon glyph="globe" /> <a target="_blank" href={`http://www.ncbi.nlm.nih.gov/pubmed/?term=${pmid}`}>
                            {`http://www.ncbi.nlm.nih.gov/pubmed/?term=${pmid}`}
                            </a>
                        </p>) : null
                    }
                </FormGroup>
            </Panel>
        );
    }
}

PMIDPanel.defaultProps = {
    alwaysOn: true
};
module.exports = connect()(PMIDPanel);
