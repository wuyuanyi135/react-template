import {connect} from "react-redux";
import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
class EntryForm extends Component {
    render() {
        console.log(FormGroup);
        return  (
            <form>
                <FormGroup>
                    <ControlLabel>Label</ControlLabel>
                    <FormControl type="text" placeholder="hehe"></FormControl>
                </FormGroup>
            </form>
        );
    }
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(EntryForm);
