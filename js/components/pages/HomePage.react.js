/*
 * HomePage
 * This is the first thing users see of our App
 */

import {
  asyncChangeProjectName, asyncChangeOwnerName
}
from '../../actions/AppActions';
import React, {
  Component
}
from 'react';
import {
  connect
}
from 'react-redux';
import {
  Link
}
from 'react-router';
import {
  Alert, Button, Nav, NavItem, Navbar, NavDropdown, MenuItem
}
from 'react-bootstrap';

class HomePage extends Component {
  handleClick() {
    console.log("TtT");
  }

  render() {
    const dispatch = this.props.dispatch;
    const {
      projectName, ownerName
    } = this.props.data;
    return (
      <div>
        <h1>Hello World!</h1>
        
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>hello</td>
              <td>world</td>
            </tr>
            
            <tr>
              <td>hello</td>
              <td>world</td>
            </tr>
          </tbody>
        </table>
        <Alert bsStyle="danger">
          <h4>Oh snap! You got an error!!!!</h4>
          <Button bsStyle="warning" onClick={this.handleClick}>Cancel</Button>
        </Alert>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
