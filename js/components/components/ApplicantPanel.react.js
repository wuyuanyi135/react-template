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
    Panel,
    InputGroup
} from 'react-bootstrap';

function ApplicantPanel(props) {
    const dispatch = props.dispatch;
    const applicant = props.applicant;
    const applicantPinyin = props.applicantPinyin;
    const department = props.department;
    const departmentPinyin = props.departmentPinyin;
    return (
        <Panel header="申请人信息">
            <div className="form-panel-content">
                <FormGroup>
                    <ControlLabel>申请人</ControlLabel>
                    <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="Applicant"
                          value={applicant}
                          onChange={e => dispatch(actions.changeApplicantName(e.target.value))}
                        />
                        <InputGroup.Addon>拼音</InputGroup.Addon>
                        <FormControl
                          type="text"
                          placeholder="Applicant Pinyin"
                          value={applicantPinyin}
                          onChange={e => dispatch(
                              actions.changeApplicantNamePinyin(e.target.value)
                          )}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>科室</ControlLabel>
                    <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="Departement"
                          value={department}
                          onChange={e => dispatch(
                              actions.changeApplicantDepartment(e.target.value)
                          )}
                        />
                        <InputGroup.Addon>拼音</InputGroup.Addon>
                        <FormControl
                          type="text"
                          placeholder="Departement Pinyin"
                          value={departmentPinyin}
                          onChange={e => dispatch(
                              actions.changeApplicantDepartmentPinyin(e.target.value)
                          )}
                        />
                    </InputGroup>
                </FormGroup>
            </div>
        </Panel>
    );
}


function select(state) {
    const data = state.importForm.applicant;
    return {
        department: data.department,
        departmentPinyin: data.departmentPinyin,
        applicant: data.applicant,
        applicantPinyin: data.applicantPinyin
    };
}
module.exports = connect(select)(ApplicantPanel);
