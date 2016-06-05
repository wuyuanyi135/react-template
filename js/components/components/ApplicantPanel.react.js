/**
 *  TODO: Autocomplete applicant and department
 */

import * as actions from '../../actions/ImportFormActions.js'
import { connect } from 'react-redux';
import React, {Component} from 'react';
import _ from 'lodash';
import {
    Button,
    FormControl,
    ControlLabel,
    FormGroup,
    Panel,
    InputGroup
} from 'react-bootstrap';

const ApplicantEntry = connect()((props) => {
    const dispatch = props.dispatch;
    const index = props.index;
    return (
        <div>
            <FormGroup>
                <ControlLabel>申请人</ControlLabel>
                <Button
                  bsStyle="link"
                  onClick={() => dispatch(actions.removeApplicant(index))}
                >删除</Button>
                <InputGroup>
                    <InputGroup.Addon>姓名</InputGroup.Addon>
                    <FormControl
                      type="text"
                      placeholder="Applicant"
                      value={props.applicant}
                      onChange={e => dispatch(actions.changeApplicantName(e.target.value, index))}
                    />
                    <InputGroup.Addon>科室</InputGroup.Addon>
                    <FormControl
                      type="text"
                      placeholder="Departement"
                      value={props.department}
                      onChange={e => dispatch(
                          actions.changeApplicantDepartment(e.target.value, index)
                      )}
                    />
                </InputGroup>
            </FormGroup>
        </div>
    );
});
const ApplicantPanel = (props) => {
    const { dispatch, applicant, ...panelProps } = props;
    const applicantData = applicant.toArray();

    return (
        <Panel {...panelProps} expanded={true} bsStyle="success" header="申请人信息">
            <div className="form-panel-content">
                {applicantData.map((item, index) =>
                    <ApplicantEntry {...item} key={index} index={index} />
                )}
                <Button
                    block
                    onClick={e => dispatch(actions.addNewApplicant())}>
                    新增申请人
                </Button>
            </div>
        </Panel>
    );
}

// connect to get dispatch method.
export default connect()(ApplicantPanel);
