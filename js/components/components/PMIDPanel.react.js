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
import {Button, FormControl, ControlLabel, FormGroup, HelpBlock, Panel} from 'react-bootstrap';


class PMIDPanel extends Component {
    constructor(){
        super()
        this.state = {};
    }
    componentDidMount () {
        setInterval(()=>{
            this.props.dispatch(actions.setImportFormState({pmid: Math.random()}));
        },1000)
    }
    render() {
        return (
            <Panel header="PMID" className="pmid-panel form-panel">
                <FormGroup>
                    <ControlLabel>PMID</ControlLabel>
                    <FormControl type="text" name="pmid" value={this.props.pmid}/>
                </FormGroup>
            </Panel>
        );
    }
}

PMIDPanel.propTypes = {
    pmid: React.PropTypes.number
} 

function select (state) {
    console.log(state);
    return {pmid:state.importForm.pmid}    
}

module.exports = connect(select) (PMIDPanel);

