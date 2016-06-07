/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import RecentImport from '../components/RecentImport.react.js';
import ApplicantDialog from '../components/ApplicantDialog.react.js';
import RecentApplicant from '../components/RecentApplicant.react.js';
import SearchBar from '../components/SearchBar.react.js';
import DetailDialog from '../components/DetailDialog.react.js';
import RecentExport from '../components/RecentExport.react.js';
import * as homeActions from '../../actions/AppActions.js';
import * as indexActions from '../../actions/IndexActions.js';
import * as importActions from '../../actions/ImportFormActions.js';
import * as applicantDialogActions from '../../actions/ApplicantDialogActions.js';

class HomePage extends Component {
    componentDidMount() {
        this.props.dispatch(homeActions.fetchRecent(false));
    }
    handleSuggestionClick(arg) {
        const { dispatch } = this.props;
        switch (arg.suggestion.original.suggestionType) {
        case 'pmid':
            dispatch(indexActions.displayArticleDialog(arg.suggestion.original._id));
            break;
        case 'title':
            dispatch(indexActions.displayArticleDialog(arg.suggestion.original._id));
            break;
        case 'applicant':
            dispatch(applicantDialogActions.displayDialog(true, arg.suggestion.original));
            break;
        default:

        }
        // (arg) => dispatch(indexActions.displayArticleDialog(arg.suggestion.original._id))
    }
    render() {
        const { show, showApplicantDialog, who, dispatch } = this.props;
        return (
            <div>
                <h1>搜索</h1>
                <SearchBar
                  onSelect={arg => this.handleSuggestionClick(arg)}
                />

                <Grid fluid>
                    <Row>
                        <Col md={4}>
                            <RecentImport />
                        </Col>
                        <Col md={4}>
                            <RecentApplicant />
                        </Col>
                        <Col md={4}>
                            <RecentExport />
                        </Col>
                    </Row>
                </Grid>
                {show ? <DetailDialog /> : null}
                {showApplicantDialog ? <ApplicantDialog /> : null}
            </div>
        );
    }
}


function select(state) {
    return {
        show: state.home.displayDialog,
        showApplicantDialog: state.home.displayApplicantDialog,
        who: state.home.applicantDialogWho
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
