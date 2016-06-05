import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button, ButtonGroup, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as importActions from '../../actions/ImportFormActions';
import SciUpdateButton from './SciUpdateButton.react.js';

class AddRowDialog extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
    }
    componentWillMount() {
        this.setState({ show: true });
    }
    componentWillUnmount() {
        this.setState({ show: false });
    }
    onSubmit(e) {
        const fn = this.props.onSubmit;
        if (fn) {
            fn($(this.refs.form).serializeObject());
        }
        e.preventDefault();
        return false;
    }
    render() {
        const { show } = this.state;
        const { onCancel } = this.props;
        return (
            <Modal
              onHide={() => { if (onCancel) { onCancel(); } }}
              show={show}
              bsSize="sm"
            >
                <Modal.Header>
                    添加条目
                </Modal.Header>
                <Modal.Body>
                    <form ref="form">
                        <FormGroup>
                            <ControlLabel>年份</ControlLabel>
                            <FormControl name="year" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>影响因子</ControlLabel>
                            <FormControl name="impact" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>分区</ControlLabel>
                            <FormControl name="section" type="text" />
                        </FormGroup>
                        <ButtonGroup block vertical>
                            <Button
                              bsStyle="info"
                              type="submit"
                              onClick={(e) => this.onSubmit(e)}
                            > 添加 </Button>
                            <Button
                              onClick={() => { if (onCancel) { onCancel(); } }}
                            >取消</Button>
                        </ButtonGroup>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}
AddRowDialog.defaultProps = {
    onSubmit: null,
    onCancel: null
}




class SciTable extends Component {
    constructor() {
        super();
        this.state = {
            adding: false,
            row: {}
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.refs.table.forceUpdate();
        }, 100);
    }
    syncTable(action, row) {
        if (action === 'insert') {
            this.props.dispatch(importActions.updateSciTable(_.concat(this.props.sci, row)));
        } else {
            // can only remove one line!
            this.props.dispatch(importActions.updateSciTable(_.reject(this.props.sci, row)));
        }
    }
    onSelect(row, isSelected) {
        if (isSelected) {
            this.setState({ row });
        }
    }
    onSubmit(form) {
        this.syncTable('insert', form);
        this.setState({ adding: false });
    }
    render() {
        const { adding } = this.state;
        const { dispatch, issn ,sci } = this.props;
        const options = {
            afterInsertRow: row => this.syncTable('insert', row),
            afterDeleteRow: row => this.syncTable('delete', row)
        };
        return (
            <div>
                <div>
                    {
                        adding ?
                        <AddRowDialog
                          onCancel={() => this.setState({ adding: false })}
                          onSubmit={(form) => this.onSubmit(form)}
                        /> : null
                    }
                    <ButtonGroup bsSize="small">
                        <Button onClick={()=>this.setState({ adding: true })}>新增</Button>
                        <Button onClick={()=>this.syncTable('delete', this.state.row)}>删除</Button>
                    </ButtonGroup>
                    <BootstrapTable
                      ref="table"
                      selectRow={{ mode: 'radio', clickToSelect: true, onSelect: this.onSelect.bind(this) }}
                      data={sci}
                      tableStyle={{ marginLeft: '0px', marginRight: '0px' }}
                      striped
                      hover
                      options={options}
                    >
                        <TableHeaderColumn dataField="year" isKey={true} dataAlign="center">年份</TableHeaderColumn>
                        <TableHeaderColumn dataField="section" editable={true} dataAlign="center">分区号</TableHeaderColumn>
                        <TableHeaderColumn dataField="impact" editable={true} dataAlign="center">影响因子</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div>
                    <SciUpdateButton issn={issn} />
                </div>
            </div>
        );
    }
}

const select = (state) => {
    return {
        issn: state.importForm.data.selectedISSN,
        sci: state.importForm.data.sci
    };
};
export default connect(select)(SciTable);
