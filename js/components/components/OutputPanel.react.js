import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWarningNotification } from '../../actions/AppActions.js';
import { updateFormData } from '../../actions/IndexActions.js';
import { submitImportFormAsync } from '../../actions/ImportFormActions.js';
import * as exportActions from '../../actions/exportActions.js';
import { ImportButton } from '../components/ImportButton.react.js';
import _ from 'lodash';
import {
    Button,
    ButtonGroup,
    Grid,
    Row,
    Col,
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
        const { id, sci, selectedApplicant, selectedSci, data, dispatch } = props;
        const applicants = props.applicants.toArray();
        const selectedApplicantText = this.computeApplicantText(selectedApplicant);
        const selectedSciText = this.computeSciText(selectedSci);
        return (
            <Panel>
                <Grid fluid={true}>
                    <Row>
                        <Col md={6} sm={12} xs={12}>
                            <FormGroup className="form-panel-content">
                                <ControlLabel className="controllabel-blk">打印申请人</ControlLabel>
                                <ButtonGroup justify block full vertical>
                                    <DropdownButton noCaret={true} bsSize="small" className="dropdown-full" title={selectedApplicantText} id="applicantSelector">
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
                                </ButtonGroup>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="form-panel-content">
                                <ControlLabel className="controllabel-blk">选择SCI</ControlLabel>
                                <ButtonGroup vertical full block>
                                    <DropdownButton noCaret={true} bsSize="small" className="dropdown-full" title={selectedSciText} id="sciSelector">
                                        {_.castArray(sci).map((item, index) => (
                                            item ?
                                            <MenuItem
                                                key={index}
                                                onClick={() => dispatch(exportActions.changeSciSelection(item))}
                                                >{this.computeSciText(item)}
                                            </MenuItem> : null
                                        ))}
                                    </DropdownButton>
                                </ButtonGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>

                <FormGroup className="form-panel-content">
                    <ButtonGroup block vertical>
                        {id ? <Button bsStyle="info" onClick={() => this.updateButtonHandler()}>保存变更</Button> : <ImportButton data={data} />}
                        {id ? <Button bsStyle="danger" onClick={() => dispatch(exportActions.deleteEntry(id))}>删除此条目</Button> : null}
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
    data: state.importForm.data,
    selectedApplicant: state.exportForm.selectedApplicant,
    selectedSci: state.exportForm.selectedSci
});
export default connect(select)(OutputPanel);
