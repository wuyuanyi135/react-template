import {
  changeTest
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
  Alert, Button, Nav, NavItem, Navbar, NavDropdown, MenuItem
}
from 'react-bootstrap';

class ImportPage extends Component {
    render() {
        return(
            <h1>导入</h1>
        );
    }
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(ImportPage);
