import {connect} from "react-redux";
import React, {Component} from 'react';
import {Button, ButtonGroup, FormGroup, ControlLabel, HelpBlock, FormControl, Panel, Glyphicon, InputGroup} from 'react-bootstrap';
class EntryForm extends Component {
    constructor() {
        super();
        this.state = {};

        // Give selection a default value;
        if (!this.state.dateSelected) {
            this.state.dateSelected = 'dateRevised';
        }
    }

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

    selectDate(e) {
        switch(e.target.id) {
            case "btndateCreated":
                this.setState({dateSelected: 'dateCreated'});
                break;
            case 'btndateCompleted':
                this.setState({dateSelected: 'dateCompleted'});
                break;
            case 'btndateRevised':
                this.setState({dateSelected: 'dateRevised'});
                break;
        };
    }
    getCurrentSelectedDate() {
        var state = this.state;
        switch (state.dateSelected) {
            case 'dateCreated':
                var dt = state.dateCreated;
                if (Object.keys(dt).length)
                    return <HelpBlock>当前：{dt.Year}-{dt.Month}-{dt.Day}</HelpBlock>
                break;
            case 'dateCompleted':
                var dt = state.dateCompleted;
                if (Object.keys(dt).length)
                    return <HelpBlock>当前：{dt.Year}-{dt.Month}-{dt.Day}</HelpBlock>
                break;
            case 'dateRevised':
                var dt = state.dateRevised;
                if (Object.keys(dt).length)
                    return <HelpBlock>当前：{dt.Year}-{dt.Month}-{dt.Day}</HelpBlock>
                break;
            default:
                return null;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.data);
    }
    componentWillMount() {
        this.setState(this.props.data);
    }

    pmidPart() {
        var state = this.state;
        return(
        <Panel header="PMID">
            <FormGroup className="form-panel-content">
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
        );
    }

    datePart() {
        var state = this.state;
        return (
        <Panel header="日期">
            <FormGroup className="form-panel-content">
                {}
                <ControlLabel>创建日期</ControlLabel>
                {this.dateInputGroup(state.dateCreated, (v)=>this.setState({dateCreated: v}))}
                <ControlLabel>完成日期</ControlLabel>
                {this.dateInputGroup(state.dateCompleted, (v)=>this.setState({dateCompleted: v}))}
                <ControlLabel>修订日期</ControlLabel>
                {this.dateInputGroup(state.dateRevised, (v)=>this.setState({dateRevised: v}))}
            </FormGroup>
            <FormGroup className="form-panel-content">
                <ControlLabel>选择日期</ControlLabel>
                <ButtonGroup block className="form-btn-group">
                   <Button
                       id='btndateCreated'
                       active={state.dateSelected == 'dateCreated'}
                       onClick={(e)=>this.selectDate(e)}
                       >创建日期</Button>
                   <Button
                       id='btndateCompleted'
                       active={state.dateSelected == 'dateCompleted'}
                       onClick={(e)=>this.selectDate(e)}
                       >完成日期</Button>
                   <Button
                       id='btndateRevised'
                       active={state.dateSelected == 'dateRevised'}
                       onClick={(e)=>this.selectDate(e)}
                       >修订日期</Button>
               </ButtonGroup>
                {this.getCurrentSelectedDate()}
            </FormGroup>

        </Panel>
        )
    }
    render() {

        return  (
            <form>
                {this.pmidPart()}
                {this.datePart()}
            </form>
        );
    }
}

EntryForm.defaultProps = {
    data : {}
};

export default EntryForm;
