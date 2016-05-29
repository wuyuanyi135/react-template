import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    Button,
    ButtonGroup,
    FormControl,
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
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.applicants.toArray());
        this.setState({ selected: nextProps.applicants.toArray()[0] });
    }
    componentDidMount() {
        this.setState({ selected: this.props.applicants.toArray()[0] });
    }
    render() {
        const props = this.props;
        const applicants = props.applicants.toArray();
        const selected = this.state.selected;
        const selectedText = selected ? `姓名: ${selected.applicant} 科室: ${selected.department}` : '请添加申请人';
        return (
            <Panel header="打印 修改">
                <FormGroup className="form-panel-content">
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
                        <Button bsStyle="info">保存变更</Button>
                        <Button>输出打印文档</Button>
                    </ButtonGroup>
                </FormGroup>
            </Panel>
        );
    }
}

const select = (state) => ({
    applicants: state.importForm.applicant
});
export default connect(select)(OutputPanel);
