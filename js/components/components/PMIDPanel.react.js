/**
 * PMID Panel
 * Accept state TODO: which state? to fill PMID field.
 * Have a button to trigger an action, which update the state TODO: which state
 * according to the PMID
 *
 */
import * as actions from '../../actions/AppActions';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Button, FormControl, ControlLabel, FormGroup, HelpBlock, Panel, Glyphicon, InputGroup} from 'react-bootstrap';
import {PulseLoader} from 'halogen';

class PMIDPanel extends Component {
    constructor(){
        super()
        this.state = {};
    }
    componentDidMount () {

    }
    render() {
        var props = this.props;
        var pmid = props.pmid;
        var isLoading = props.isLoading;
        var dispatch = this.props.dispatch;
        return (
            <Panel header="PMID" className="pmid-panel form-panel">
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
                                onKeyPress={e => e.charCode == 13? dispatch(actions.updateImportFormAsync(pmid)): null}
                                />

                                {
                                    isLoading? (
                                        <FormControl.Feedback>

                                        </FormControl.Feedback>
                                    ): null
                                }
                        </FormGroup>

                        <InputGroup.Button>
                            <Button
                                disabled={isLoading}
                                onClick={()=>dispatch(actions.updateImportFormAsync(pmid))}
                                >{isLoading?
                                    <div className="form-loader-container"><PulseLoader size="10px" color="#bbb"/></div>
                                    : <div>在线获取</div>
                                    }</Button>
                        </InputGroup.Button>
                    </InputGroup>

                        {pmid ?
                            (<p>
                                前往链接 <Glyphicon glyph="globe"/> <a target="_blank" href={"http://www.ncbi.nlm.nih.gov/pubmed/?term=" + pmid}>
                                {"http://www.ncbi.nlm.nih.gov/pubmed/?term=" + pmid }
                                </a>
                            </p>) : null}
                </FormGroup>
            </Panel>
        );
    }
}

PMIDPanel.propTypes = {
    pmid: React.PropTypes.string
}

function select (state) {
    return {
        pmid:state.importForm.data.pmid,
        isLoading: state.importForm.isLoading
    }
}
module.exports = connect(select) (PMIDPanel);
