import React, { Component } from 'react';

class PrintPage extends Component {
    render() {
        return (
            <div className="print-page">
                <div className="print-title-container">
                    <div className="print-header">温州医科大学附属第一医院图书馆</div>
                    <div className="print-subtitle">SCI论文收录检索证明</div>
                </div>
                <div className="print-table-container">
                    <div className="print-table">
                        <div className="print-row">
                            <div className="print-label">姓名</div>
                            <div className="print-field">XXX</div>
                            <div className="print-label">科室</div>
                            <div className="print-field">keke</div>
                            <div className="print-label">日期</div>
                            <div className="print-field">2222-22-22</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrintPage;
