import * as actions from '../../actions/ImportFormActions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import _ from 'lodash';
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
};

class ArticleInfoPanel extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false
        };
    }
    validateTitle() {
        return this.props.articleTitle ? 'success' : 'error';
    }
    validateSource() {
        return this.props.source ? 'success' : 'error';
    }
    validatePTSelection() {
        return this.props.selectedPublicationTypes ? 'success' : 'error';
    }
    validatePanel() {
        return _.every([
            this.validateTitle(),
            this.validateSource(),
            this.validatePTSelection(),
            // this.validateIssn()
        ],
        (item) => item === 'success')
        ? 'success' : 'warning';
    }
    render() {
        const props = this.props;
        const { dispatch, source, pt, articleTitle, selectedPublicationTypes, ...panelProps } = props;
        const selectedPT = selectedPublicationTypes;
        const validation = this.validatePanel();

        return (
            <Panel
              {...panelProps}
              onMouseOver={() => this.setState({ expanded: true })}
              onMouseLeave={() => this.setState({ expanded: false })}
              expanded={this.state.expanded || this.props.alwaysOn || validation === 'warning'}
              bsStyle={validation}
              className="author-panel form-panel"
            >
                <div className="form-panel-content">
                    <FormGroup validationState={articleTitle ? 'success' : 'error'}>
                        <ControlLabel>文献标题</ControlLabel>
                        <FormControl
                          type="text"
                          value={articleTitle}
                          onChange={e => dispatch(actions.changeArticleTitle(e.target.value))}
                          placeholder="Article Title"
                        />
                    </FormGroup>
                    <FormGroup
                      validationState={source ? 'success' : 'error'}
                    >
                        <ControlLabel>来源</ControlLabel>
                        <FormControl
                          type="text"
                          value={source}
                          onChange={e => dispatch(actions.changeSource(e.target.value))}
                          placeholder="Source"
                        />
                    </FormGroup>

                    {
                        _.castArray(pt).length ? (
                            <FormGroup>
                                <ControlLabel>来源 PT (PubMed)</ControlLabel>
                                <ListGroup>
                                    {
                                        _.castArray(pt).map((item, index) => (
                                            <ListGroupItem key={index}>
                                                {item}
                                            </ListGroupItem>
                                        ))
                                    }
                                </ListGroup>
                            </FormGroup>
                        ) : null
                    }
                    <FormGroup validationState={selectedPT ? 'success' : 'error'}>
                        <ControlLabel className="controllabel-blk">PT选择</ControlLabel>
                        <ButtonGroup>
                            <Button active={selectedPT == '论著'} onClick={e => handlePTButtonClick(e, dispatch)}>论著</Button>
                            <Button active={selectedPT == '综述'} onClick={e => handlePTButtonClick(e, dispatch)}>综述</Button>
                            <Button active={selectedPT == 'Meta分析'} onClick={e => handlePTButtonClick(e, dispatch)}>Meta分析</Button>
                            <Button active={selectedPT == '信函'} onClick={e => handlePTButtonClick(e, dispatch)}>信函</Button>
                            <Button active={selectedPT == '病例报道'} onClick={e => handlePTButtonClick(e, dispatch)}>病例报道</Button>
                        </ButtonGroup>
                    </FormGroup>
                </div>
            </Panel>
        );
    }
}
ArticleInfoPanel.defaultProps = {
    alwaysOn: true
};
module.exports = connect()(ArticleInfoPanel);
