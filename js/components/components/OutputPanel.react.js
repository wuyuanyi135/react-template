import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateFormData } from '../../actions/IndexActions.js';
import _ from 'lodash';
import {
    Button,
    ButtonGroup,
    HelpBlock,
    ControlLabel,
    FormGroup,
    Panel,
    MenuItem,
    DropdownButton
} from 'react-bootstrap';

class OutputPanel extends Component {
    constructor() {
        super();
        this.state = {
            selected: {}
        };
    }
    componentWillMount() {
        this.setState({ selected: this.props.applicants.toArray()[0] });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ selected: nextProps.applicants.toArray()[0] });
    }
    updateButtonHandler() {
        this.props.dispatch(updateFormData(this.props.id));
    }
    render() {
        const props = this.props;
        const applicants = props.applicants.toArray();
        const id = props.id;
        const selected = this.state.selected;
        const selectedText = selected ? `姓名: ${selected.applicant} 科室: ${selected.department}` : '请添加申请人';
        return (
            <Panel header="打印 修改 ">
                <FormGroup className="form-panel-content">
                    <HelpBlock>id: {id}</HelpBlock>
                    <ControlLabel className="controllabel-blk">打印申请人</ControlLabel>
                    <DropdownButton title={selectedText} id="applicantSelector">
                        {_.castArray(applicants).map((item, index) => (
                            item ?
                                <MenuItem
                                  key={index}
                                  onClick={() => this.setState({ selected: item })}
                                >姓名: {item.applicant} 科室: {item.department}
                                </MenuItem> : null
                        ))}
                    </DropdownButton>
                </FormGroup>
                <FormGroup className="form-panel-content">
                    <ButtonGroup block vertical>
                        <Button bsStyle="info" onClick={() => this.updateButtonHandler()}>保存变更</Button>
                        <Button>输出打印文档</Button>
                    </ButtonGroup>

                </FormGroup>

            </Panel>
        );
    }
}

const select = (state) => ({
    applicants: state.importForm.data.applicant,
    id: state.importForm.data._id
});
export default connect(select)(OutputPanel);
