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
    DropdownButton,
	Popover,
	OverlayTrigger
} from 'react-bootstrap';

class OutputPanel extends Component {
    constructor() {
        super();
        this.state = {
            dropdownClickState: false
        };
    }
    componentWillMount() {
        // select the first data as default
        this.props.dispatch(
            exportActions.changeApplicantSelection(_.last(this.props.applicants.toArray()))
        );
		//console.log(this.props.sci);
        //this.props.dispatch(
        //    exportActions.changeSciSelection(this.props.selectedSci)
		//	exportActions.changeSciSelection(null)
        //);
    }
    componentWillReceiveProps(nextProps) {
        // select the first data as default
        if (this.state.dropdownClickState) {
            this.setState({ dropdownClickState: false });
        } else {
            this.props.dispatch(
                exportActions.changeApplicantSelection(_.last(nextProps.applicants.toArray()))
            );
			this.props.dispatch(
                //exportActions.changeSciSelection(nextProps.sci[0])
				exportActions.changeSciSelection(null)
            );
        }
    }

    updateButtonHandler() {
        this.props.dispatch(updateFormData(this.props.id));
    }

    computeApplicantText(selectedApplicant) {
        return selectedApplicant ? `姓名: ${selectedApplicant.applicant} 科室: ${selectedApplicant.department}` : '请添加申请人';
    }
    computeSciText(selectedSci, scilist) {
		if (scilist) {
			scilist = _.castArray(scilist);
			if (!_.includes(scilist, selectedSci)) {
				return '影响因子';
			}
		}
        return selectedSci ? `年份: ${selectedSci.year} IF: ${selectedSci.impact} 分区: ${selectedSci.section}` : '请添加SCI';
    }
    handleApplicantDropdown(item) {
        this.setState({ dropdownClickState: true });
        this.props.dispatch(exportActions.changeApplicantSelection(item));
    }
    handleSciDropdown(item) {
        this.setState({ dropdownClickState: true });
        this.props.dispatch(exportActions.changeSciSelection(item));
    }
	popOverHandler() {
		return (
			<Popover id="popover-trigger-hover-focus" title="出处">
				{this.props.data.source}
			</Popover>
		);
	}
    render() {
        const props = this.props;
        const { id, sci, selectedApplicant, selectedSci, data, dispatch } = props;
        const applicants = props.applicants.toArray();
        const selectedApplicantText = this.computeApplicantText(selectedApplicant);
        const selectedSciText = this.computeSciText(selectedSci,sci);
        return (
            <Panel>
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            <FormGroup className="form-panel-content">
                                <ControlLabel className="controllabel-blk">打印申请人</ControlLabel>
                                <ButtonGroup block full vertical>
                                    <DropdownButton
                                      noCaret
                                      bsSize="small"
                                      className="dropdown-full"
                                      title={selectedApplicantText}
                                      id="applicantSelector"
                                      onClick={() => this.setState({ dropdownClickState: true })}
                                    >
                                        {_.castArray(applicants).map((item, index) => (
                                            item ?
                                            <MenuItem
                                              key={index}
                                              onClick={() => this.handleApplicantDropdown(item)}
                                            >
                                                {this.computeApplicantText(item)}
                                            </MenuItem> : null
                                        ))}
                                    </DropdownButton>
                                </ButtonGroup>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="form-panel-content" validationState={selectedSci ? 'success' : 'error'}>
                                <ControlLabel className="controllabel-blk">选择SCI</ControlLabel>
								<OverlayTrigger trigger="hover" placement="top" overlay={this.popOverHandler()}>
									<ButtonGroup vertical full block>
										<DropdownButton
										  noCaret
										  bsSize="small"
										  style={{color: selectedSci? null : 'red'}}
										  className="dropdown-full"
										  title={selectedSciText}
										  id="sciSelector"
										  onClick={() => this.setState({ dropdownClickState: true })}
										>
											{_.castArray(sci).map((item, index) => (
												item ?
												<MenuItem
												  key={index}
												  onClick={() => this.handleSciDropdown(item)}
												>{this.computeSciText(item, sci)}
												</MenuItem> : null
											))}
										</DropdownButton>
									</ButtonGroup>
								</OverlayTrigger>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>

                <FormGroup className="form-panel-content">
                    <ButtonGroup block vertical>
                        {id ? <Button bsStyle="info" onClick={() => this.updateButtonHandler()}>保存变更</Button> : <ImportButton data={data} />}
                        {id ? <Button bsStyle="danger" onClick={() => dispatch(exportActions.deleteEntry(id))}>删除此条目</Button> : null}
                        <Button disabled={!selectedSci} onClick={() => dispatch(exportActions.exportPrintPage())}>打印并保存</Button>
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
