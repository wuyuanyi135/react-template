import {connect} from "react-redux";
import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Panel, Glyphicon, InputGroup} from 'react-bootstrap';
class EntryForm extends Component {
    _stateHelper (stateName, value) {
        var s = {}
        s[stateName] = value;
        return s;
    }

    /***
     * dt: date object containing `Year`, `Month`, `Day`
     * cb: onChange callback with arg updated date
     */
    dateInputGroup (dt,cb) {
        return (
            <InputGroup>
                <FormControl
                    className="date-text"
                    type="text"
                    value={dt.Year}
                    onChange={(e)=>cb?cb(Object.assign({},dt,{Year:e.target.value})):null}
                    ></FormControl>
                <InputGroup.Addon>年</InputGroup.Addon>
                <FormControl
                    className="date-text"
                    type="text"
                    value={dt.Month}
                    onChange={(e)=>cb?cb(e.target.value):null}
                    ></FormControl>
                <InputGroup.Addon>月</InputGroup.Addon>
                <FormControl
                    className="date-text"
                    type="text"
                    value={dt.Day}
                    onChange={(e)=>cb?cb(e.target.value):null}
                    ></FormControl>
                <InputGroup.Addon>日</InputGroup.Addon>
            </InputGroup>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.data);
    }
    componentWillMount() {
        this.setState(this.props.data);
    }
    constructor() {
        super();
        this.state = {};
    }
    render() {
        var state = this.state;
        return  (
            <form>
                <Panel header="PMID">
                    <FormGroup bsClass="form-panel-content">
                        <ControlLabel>PMID</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="PMID"
                            value={state.pmid}
                            onChange={(e)=>this.setState({pmid:e.target.value})}
                            ></FormControl>
                        {state.pmid ?
                            (<p>
                                前往链接 <Glyphicon glyph="globe"/> <a target="_blank" href={"http://www.ncbi.nlm.nih.gov/pubmed/?term=" + state.pmid}>
                                {"http://www.ncbi.nlm.nih.gov/pubmed/?term=" + state.pmid }
                                </a>
                            </p>) : null}
                    </FormGroup>
                </Panel>

                <Panel header="日期">
                    <FormGroup bsClass="form-panel-content">
                        <ControlLabel>创建日期</ControlLabel>
                        {this.dateInputGroup(state.dateCreated, (v)=>this.setState({dateCreated: v}))}
                        <ControlLabel>完成日期</ControlLabel>
                        {this.dateInputGroup(state.dateCompleted, (v)=>this.setState({dateCompleted: v}))}
                        <ControlLabel>修订日期</ControlLabel>
                        {this.dateInputGroup(state.dateRevised, (v)=>this.setState({dateRevised: v}))}
                    </FormGroup>
                </Panel>

            </form>
        );
    }
}

EntryForm.defaultProps = {
    data : {}
};

export default EntryForm;
