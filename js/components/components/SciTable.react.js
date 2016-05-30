import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as importActions from '../../actions/ImportFormActions';

class SciTable extends Component {
    constructor() {
        super();
    }

    render() {
        const dispatch = this.props.dispatch;
        const issn = this.props.issn;
        const sci = this.props.sci;
        return (
            <div>
                { sci.length ?
                    <BootstrapTable tableHeaderClass="table-cancel-margin" data={sci} striped={true} hover={true}>
                        <TableHeaderColumn dataField="year" isKey={true} dataAlign="center">年份</TableHeaderColumn>
                        <TableHeaderColumn dataField="section">分区号</TableHeaderColumn>
                        <TableHeaderColumn dataField="impact">影响因子</TableHeaderColumn>
                    </BootstrapTable>
                    : null
                }


                <div>
                    <Button
                      block
                      bsStyle="info"
                      onClick={()=>dispatch(importActions.updateSci(issn))}
                    >自动获取</Button>
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
