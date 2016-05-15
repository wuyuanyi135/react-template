/**
 *  TODO: Autocomplete applicant and department
 */

import * as actions from '../../actions/AppActions';
import { connect } from 'react-redux';
import React from 'react';
import {
    FormControl,
    ControlLabel,
    FormGroup,
    Panel
} from 'react-bootstrap';

function ApplicantPanel(props) {
    const dispatch = props.dispatch;
    const applicant = props.applicant;
    const department = props.department;
    return (
        <Panel header="申请人信息">
            <div className="form-panel-content">
                <FormGroup>
                    <ControlLabel>申请人</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Applicant"
                      value={applicant}
                      onChange={e => dispatch(actions.changeApplicantName(e.target.value))}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>科室</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Departement"
                      value={department}
                      onChange={e => dispatch(actions.changeApplicantDepartment(e.target.value))}
                    />
                </FormGroup>
            </div>
        </Panel>
    );
}


function select(state) {
    return {
        department: state.importForm.data.department,
        applicant: state.importForm.data.applicant
    };
}
module.exports = connect(select)(ApplicantPanel);
