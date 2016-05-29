/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import RecentImport from '../components/RecentImport.react.js';
import RecentApplicant from '../components/RecentApplicant.react.js';
import SearchBar from '../components/SearchBar.react.js';
import DetailDialog from '../components/DetailDialog.react.js';
import * as homeActions from '../../actions/AppActions.js';
import * as indexActions from '../../actions/IndexActions.js';
import * as importActions from '../../actions/ImportFormActions.js';

class HomePage extends Component {
    componentDidMount() {
        this.props.dispatch(homeActions.fetchRecent(false));
    }
    render() {
        const dispatch = this.props.dispatch;
        const show = this.props.show;
        return (
            <div>
                <h1>搜索</h1>
                <SearchBar onSelect={(arg) => dispatch(indexActions.displayArticleDialog(arg.suggestion.original._id))}/>

                <Grid fluid>
                    <Row>
                        <Col md={4}>
                            <RecentImport />
                        </Col>
                        <Col md={4}>
                            <RecentApplicant />
                        </Col>
                        <Col md={4}>

                        </Col>
                    </Row>
                </Grid>
                {show ? <DetailDialog /> : null}
            </div>
        );
    }
}


function select(state) {
    return {
        show: state.home.displayDialog
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
