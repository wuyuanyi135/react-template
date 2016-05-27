/*
 * HomePage
 * This is the first thing users see of our App
 */

import {changeTest} from '../../actions/AppActions';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button, FormControl, FormGroup, InputGroup, Grid, Row, Col} from 'react-bootstrap';
import {push} from 'react-router-redux';
import RecentImport from '../components/RecentImport.react.js';
import RecentApplicant from  '../components/RecentApplicant.react.js';
import SearchBar from '../components/SearchBar.react.js';
class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;

    return (
      <div>
          <h1>搜索</h1>
          <SearchBar/>

          <Grid fluid={true}>
              <Row>
                  <Col md={4}>
                      <RecentImport/>
                  </Col>
                  <Col md={4}>
                      <RecentApplicant/>
                  </Col>
                  <Col md={4}>

                  </Col>
              </Row>
          </Grid>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state.homeReducer
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
