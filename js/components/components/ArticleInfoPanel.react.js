import * as actions from '../../actions/AppActions';
import { connect } from 'react-redux';
import React from 'react';
import {
    Button,
    FormControl,
    ControlLabel,
    FormGroup,
    Panel
} from 'react-bootstrap';

const ArticleInfoPanel = (props) => {
    const dispatch = props.dispatch;

    const source = props.source;
    const issn = props.issn;
    const issnType = props.issnType;
    return (
        <Panel header="文献信息" className="author-panel form-panel">
            <div className="form-panel-content">
                <FormGroup>
                    <ControlLabel>来源</ControlLabel>
                    <FormControl
                      type="text"
                      value={source}
                      onChange={e => dispatch(actions.changeSource(e.target.value))}
                      placeholder="Source"
                    />
                </FormGroup>

                <FormGroup>
                    <ControlLabel>ISSN {issnType ? `(类型: ${issnType})` : null}</ControlLabel>
                    <FormControl
                      type="text"
                      value={issn}
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
        issnType: state.importForm.data.issnType
    };
}
module.exports = connect(select)(ArticleInfoPanel);
