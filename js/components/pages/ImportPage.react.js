import {changeTest} from '../../actions/AppActions';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Button, Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import EntryForm from '../components/EntryForm.react.js';
class ImportPage extends Component {
    render() {
        var data = {"pmid":"1233485","dateCreated":{"Year":"1976","Month":"11","Day":"21"},"dateCompleted":{"Year":"1976","Month":"11","Day":"21"},"dateRevised":{"Year":"2013","Month":"11","Day":"21"},"issn":"0302-7600","issnType":null,"journalTitle":"Praktische Anästhesie, Wiederbelebung und Intensivtherapie","journalAbbr":"Prakt Anaesth","articleTitle":"[The effect of ketamine on haemodynamics and myocardial oxygen consumption in anaesthetized dogs (author's transl)].","authors":[{"name":"Patschke D","lastName":"Patschke","foreName":"D","collectiveName":null,"affiliation":null},{"name":"Brückner JB","lastName":"Brückner","foreName":"J B","collectiveName":null,"affiliation":null},{"name":"Gethmann JW","lastName":"Gethmann","foreName":"J W","collectiveName":null,"affiliation":null},{"name":"Tarnow J","lastName":"Tarnow","foreName":"J","collectiveName":null,"affiliation":null},{"name":"Weymar A","lastName":"Weymar","foreName":"A","collectiveName":null,"affiliation":null}],"publicationTypes":["English Abstract","Journal Article"]};

        return(
            <div>
                <h1>导入</h1>
                <EntryForm data={data}></EntryForm>
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
