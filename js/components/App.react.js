/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Navbar, MenuItem } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';
import { NotificationStack } from 'react-notification';
import { push } from 'react-router-redux';
import { removeNotification } from '../actions/AppActions.js';
class App extends Component {

    render() {
        var dispatch = this.props.dispatch;
        var notifications = this.props.notifications;
        return (
            <div>
                <div className="header">
                  <AutoAffix container={this} affixClassName="nav-affix">
                      {this.getNavBar(dispatch)}
                  </AutoAffix>
                </div>
                <div className="wrapper">
                    { this.props.children }
                </div>
                    <NotificationStack
                        notifications={notifications.toArray()}
                        onDismiss={(notification) => dispatch(removeNotification(notification))}/>
            </div>
        );
    }

    getNavBar(dispatch) {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a onClick={() => dispatch(push('/'))}>ezDoc</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => dispatch(push('/'))}>索引</NavItem>
                        <NavItem eventKey={2} onClick={() => dispatch(push('/import'))}>录入</NavItem>
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
