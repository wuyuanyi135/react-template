/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../img/logo.png';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import {AutoAffix} from 'react-overlays';
import {NotificationStack} from 'react-notification';

import * as actions from "../actions/AppActions.js";
class App extends Component {

    render() {
        var dispatch = this.props.dispatch;
        var notifications = this.props.notifications;
        return (
            <div>
                <div className="header">
                  <AutoAffix container={this} affixClassName="nav-affix">
                      {this.getNavBar()}
                  </AutoAffix>
                </div>
                <div className="wrapper">
                    { this.props.children }
                </div>
                    <NotificationStack
                        notifications={notifications.toArray()}
                        onDismiss={(notification) => dispatch(actions.removeNotification(notification))}/>
            </div>
        );
    }

    getNavBar() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">ezDoc</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">索引</NavItem>
                        <NavItem eventKey={2} href="/import">录入</NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Link Right</NavItem>
                        <NavItem eventKey={2} href="#">Link Right</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    notifications: state.home.notifications
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
