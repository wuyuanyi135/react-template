import * as actions from '../../actions/AppActions';
import { connect } from 'react-redux';
import React from 'react';
import {
    Button,
    FormControl,
    ControlLabel,
    FormGroup,
    Panel,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

const ArticleInfoPanel = (props) => {
    const dispatch = props.dispatch;

    const source = props.source;
    const issn = props.issn;
    const selectedISSN = props.selectedISSN;
    const pt = Object.assign([], props.pt);
    return (
        <Panel header="文献信息" className="author-panel form-panel">
            <div className="form-panel-content">
                <FormGroup
                  validationState={source?'success':'error'}>
                    <ControlLabel>来源</ControlLabel>
                    <FormControl
                      type="text"
                      value={source}
                      onChange={e => dispatch(actions.changeSource(e.target.value))}
                      placeholder="Source"
                    />
                </FormGroup>

                {
                    pt.length ? (
                        <FormGroup>
                            <ControlLabel>来源 PT (PubMed)</ControlLabel>
                            <ListGroup>
                                {
                                    pt.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            {item}
                                        </ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                        </FormGroup>
                    ) : null
                }
                <FormGroup>
                    <ControlLabel>PT选择</ControlLabel>
                </FormGroup>
                {issn.length ?
                    <FormGroup>
                        <ControlLabel>ISSN 列表 (PubMed)</ControlLabel>
                        <ListGroup>
                            {issn.map((item, index) => {
                                return (
                                    <ListGroupItem
                                        header={item.issnType}
                                        key={index}
                                        onClick={e=>dispatch(actions.changeISSNSelection(item.issn))}>
                                            {item.issn}
                                    </ListGroupItem>
                                );
                            })}
                        </ListGroup>
                    </FormGroup>
                    :null
                }
                <FormGroup validationState={selectedISSN ? 'success' : 'error'}>
                    <ControlLabel>ISSN 选择</ControlLabel>
                    <FormControl
                        type="text"
                        value={selectedISSN}
                        placeholder="selectedISSN"
                        onChange={e=>dispatch(actions.changeISSNSelection(e.target.value))}
                        />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>分区/SCI</ControlLabel>
                    <div><Button>自动获取</Button></div>
                </FormGroup>
            </div>
        </Panel>
    );
};

function select(state) {
    return {
        source: state.importForm.data.source,
        issn: state.importForm.data.issn,
        selectedISSN: state.importForm.data.selectedISSN,
        pt: state.importForm.data.publicationTypes
    };
}
module.exports = connect(select)(ArticleInfoPanel);
