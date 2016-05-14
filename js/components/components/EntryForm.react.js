import {connect} from "react-redux";
import React, {Component} from 'react';
import {Button, ButtonGroup, FormGroup, ControlLabel, HelpBlock, FormControl, Panel, Glyphicon, InputGroup} from 'react-bootstrap';
import PMIDPanel from './PMIDPanel.react';
import AuthorPanel from './AuthorPanel.react';
class EntryForm extends Component {
    constructor() {
        super();
    }

    render() {
        var notifications = this.props.notifications;
        return  (
            <div>
                <form>
                    <PMIDPanel/>
                    <AuthorPanel/>
                </form>
            </div>
        );
    }
}

export default EntryForm;
