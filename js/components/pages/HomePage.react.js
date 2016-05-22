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
class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;

    return (
      <div>
          <h1>搜索</h1>
          <FormGroup className="search-container">
              <InputGroup>
                  <FormControl
                      type="text"
                      placeholder="搜索"/>
                  <InputGroup.Button>
                      <Button>搜索</Button>
                  </InputGroup.Button>
              </InputGroup>
          </FormGroup>

          <Grid>
              <Row>
                  <Col md={6}>
                      <RecentImport/>
                  </Col>
                  <Col md={6}>

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
