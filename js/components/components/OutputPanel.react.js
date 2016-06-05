import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFormData } from '../../actions/IndexActions.js';
import * as exportActions from '../../actions/exportActions.js';
import _ from 'lodash';
import {
    Button,
    ButtonGroup,
    ControlLabel,
    FormGroup,
    Panel,
    MenuItem,
    DropdownButton
} from 'react-bootstrap';

class OutputPanel extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentWillMount() {
        // select the first data as default
        this.props.dispatch(
            exportActions.changeApplicantSelection(this.props.applicants.toArray()[0])
        );
        this.props.dispatch(
            exportActions.changeSciSelection(this.props.sci[0])
        );
    }

    updateButtonHandler() {
        this.props.dispatch(updateFormData(this.props.id));
    }

    computeApplicantText(selectedApplicant) {
        return selectedApplicant ? `姓名: ${selectedApplicant.applicant} 科室: ${selectedApplicant.department}` : '请添加申请人';
    }
    computeSciText(selectedSci) {
        return selectedSci ? `年份: ${selectedSci.year} IF: ${selectedSci.impact} 分区: ${selectedSci.section}` : '请添加SCI';
    }
    render() {
        const props = this.props;
        const { id, sci, selectedApplicant, selectedSci, dispatch } = props;
        const applicants = props.applicants.toArray();
        const selectedApplicantText = this.computeApplicantText(selectedApplicant);
        const selectedSciText = this.computeSciText(selectedSci);
        return (
            <Panel header="打印 修改 ">
                <FormGroup className="form-panel-content">
                    <ControlLabel className="controllabel-blk">打印申请人</ControlLabel>
                    <DropdownButton title={selectedApplicantText} id="applicantSelector">
                        {_.castArray(applicants).map((item, index) => (
                            item ?
                                <MenuItem
                                  key={index}
                                  onClick={() => dispatch(exportActions.changeApplicantSelection(item))}
                                >
                                    {this.computeApplicantText(item)}
                                </MenuItem> : null
                        ))}
                    </DropdownButton>
                </FormGroup>
                <FormGroup className="form-panel-content">
                    <ControlLabel className="controllabel-blk">选择SCI</ControlLabel>
                    <DropdownButton title={selectedSciText} id="sciSelector">
                        {_.castArray(sci).map((item, index) => (
                            item ?
                                <MenuItem
                                  key={index}
                                  onClick={() => dispatch(exportActions.changeSciSelection(item))}
                                >{this.computeSciText(item)}
                                </MenuItem> : null
                        ))}
                    </DropdownButton>
                </FormGroup>
                <FormGroup className="form-panel-content">
                    <ButtonGroup block vertical>
                        <Button bsStyle="info" onClick={() => this.updateButtonHandler()}>保存变更</Button>
                        <Button onClick={() => dispatch(exportActions.exportPrintPage())}>输出打印文档</Button>
                    </ButtonGroup>

                </FormGroup>

            </Panel>
        );
    }
}

const select = (state) => ({
    applicants: state.importForm.data.applicant,
    sci: state.importForm.data.sci,
    id: state.importForm.data._id,
    selectedApplicant: state.exportForm.selectedApplicant,
    selectedSci: state.exportForm.selectedSci
});
export default connect(select)(OutputPanel);
