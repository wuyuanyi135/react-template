import * as actions from '../../actions/ImportFormActions';
import { connect } from 'react-redux';
import React from 'react';
import SciTable from './SciTable.react.js';
import {
    Button,
    ButtonGroup,
    FormControl,
    ControlLabel,
    FormGroup,
    Panel,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';

const handlePTButtonClick = (e, dispatch) => {
    dispatch(actions.changePTSelection(e.target.textContent));
}

const ArticleInfoPanel = (props) => {
    const dispatch = props.dispatch;

    const data = props;
    const source = data.source;
    const issn = data.issn;
    const selectedISSN = data.selectedISSN;
    const selectedPT = data.selectedPublicationTypes;
    const articleTitle = data.articleTitle;
    const pt = Object.assign([], data.pt);

    return (
        <Panel header="文献信息" className="author-panel form-panel">
            <div className="form-panel-content">
                <FormGroup validationState={articleTitle ? 'success' : 'error'}>
                    <ControlLabel>文献标题</ControlLabel>
                    <FormControl
                        type="text"
                        value={articleTitle}
                        onChange={e=>dispatch(actions.changeArticleTitle(e.target.value))}
                        placeholder="Article Title"
                        />
                </FormGroup>
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
                <FormGroup validationState={selectedPT? 'success' : 'error'}>
                    <ControlLabel className="controllabel-blk">PT选择</ControlLabel>
                    <ButtonGroup>
                        <Button active={selectedPT=="论著"} onClick={e => handlePTButtonClick(e, dispatch)}>论著</Button>
                        <Button active={selectedPT=="综述"} onClick={e => handlePTButtonClick(e, dispatch)}>综述</Button>
                        <Button active={selectedPT=="Meta分析"} onClick={e => handlePTButtonClick(e, dispatch)}>Meta分析</Button>
                        <Button active={selectedPT=="信函"} onClick={e => handlePTButtonClick(e, dispatch)}>信函</Button>
                        <Button active={selectedPT=="病例报道"} onClick={e => handlePTButtonClick(e, dispatch)}>病例报道</Button>
                    </ButtonGroup>
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

                    <SciTable></SciTable>

                </FormGroup>
            </div>
        </Panel>
    );
};

module.exports = connect()(ArticleInfoPanel);
