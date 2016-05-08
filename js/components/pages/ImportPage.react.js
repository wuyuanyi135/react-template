import {changeTest} from '../../actions/AppActions';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Button, Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import EntryForm from '../components/EntryForm.react.js';
class ImportPage extends Component {
    render() {
        return(
            <div>
                <h1>导入</h1>
                <EntryForm></EntryForm>
            </div>
        );
    }
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(ImportPage);
