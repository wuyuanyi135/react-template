import * as actions from '../../actions/AppActions';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {ListGroup, ListGroupItem, FormControl, ControlLabel, FormGroup, Panel, InputGroup} from 'react-bootstrap';
import _ from 'lodash';

class AuthorPanel extends Component {
    constructor() {
        super();

    }
    render() {

        var props = this.props;

        var dispatch = props.dispatch;
        var authors = props.authors;
        var affiliation = props.affiliation?props.affiliation: [];
        var selectedAffiliation = props.selectedAffiliation;
        return (
            <Panel header="作者" className="author-panel form-panel">
                <FormGroup className="form-panel-content">
                    <ControlLabel>作者</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Authors"
                        onChange={e => dispatch(actions.changeAuthors(e.target.value))}
                        value={authors}></FormControl>
                </FormGroup>
                {affiliation.length? (
                    <FormGroup className="form-panel-content">
                        <ControlLabel>所属单位列表 (点击选择)</ControlLabel>
                        <ListGroup>
                            {console.log(affiliation)}
                            {console.log(_(affiliation).uniq().omitBy(_.isNull).values().value())}
                            {_(affiliation).uniq().omitBy(_.isNull).values().value().map((aff, index) =>
                                <ListGroupItem
                                    key={index}
                                    onClick={e => dispatch(actions.changeAffiliationSelection(e.target.textContent))}
                                    >{aff}</ListGroupItem>) }
                        </ListGroup>
                    </FormGroup>) :null
                }
                <FormGroup className="form-panel-content">
                    <ControlLabel>所属单位 (可编辑)</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Affiliation"
                        onChange={e => dispatch(actions.changeAffiliationSelection(e.target.value))}
                        value={selectedAffiliation}></FormControl>
                </FormGroup>
            </Panel>
        );
    }
}


function select(state){
    return {
        authors: state.importForm.data.authors,
        affiliation: state.importForm.data.affiliation,
        selectedAffiliation: state.importForm.data.selectedAffiliation
    }
}
module.exports = connect(select) (AuthorPanel);
