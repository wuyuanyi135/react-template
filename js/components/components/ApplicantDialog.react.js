import React, { Component } from 'react';
import {
    Modal,
    Media
} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as homeActions from '../../actions/AppActions.js';
import * as indexActions from '../../actions/IndexActions.js';
import * as importActions from '../../actions/ImportFormActions.js';
import * as applicantDialogActions from '../../actions/ApplicantDialogActions.js';
import reqwest from 'reqwest';

class ApplicantDialog extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        const applicant = this.props.who;
        const { dispatch } = this.props;
        if (!applicant) {
            dispatch(homeActions.addWarningNotification('申请人名字无效 (空)'));
            dispatch(applicantDialogActions.displayDialog(false));
        } else {
            reqwest({
                url: `/api/service/entry?applicant.applicant=${applicant}&$select[]=applicant&$select[]=createdAt&$select[]=articleTitle&$select[]=pmid&$select[]=_id`,
                method: 'get'
            })
            .then(value => {
                const state = _(value)
                    .map(item => ({
                        _id: item._id,
                        pmid: item.pmid,
                        createdAt: item.createdAt,
                        articleTitle: item.articleTitle,
                        department: this.getDepartment(item.applicant, applicant)
                    }))
                    .value();
                this.setState({ data: state });
            })
            .fail(err => {
                dispatch(homeActions.addWarningNotification('申请人获取失败'));
                console.error("[Applicant Dialog] Failed to fetch applicant", err);
            });
        }
    }
    getDepartment(applicantArray, who) {
        const reduced = _(applicantArray)
            .reduce((p, c) => (
                (c && c.applicant === who) ? `${p}, ${c.department}` : p
            ), '');
        return _.trim(reduced, ', ');
    }
    render() {
        const { show, dispatch, who } = this.props;
        const { data } = this.state;
        return (
            <div>

                <Modal
                  show={show}
                  onHide={() => {
                      dispatch(applicantDialogActions.displayDialog(false));
                  }}
                >
                    <Modal.Header>
                        <Modal.Title>申请人: {who}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            {
                                _(data)
                                .map((item, index) => (

                                    <Media
                                      key={index}
                                      className="recent-item"
                                      onClick={() => dispatch(indexActions.displayArticleDialog(item._id))}
                                    >
                                        <Media.Body>
                                            <Media.Heading>
                                                {item.articleTitle}
                                            </Media.Heading>
                                            <p>{item.department} {who} 于 {new Date(item.createdAt).toLocaleString()} 加入</p>
                                            {item.pmid ? <p>PMID: {item.pmid}</p> : null}
                                        </Media.Body>

                                    </Media>
                                )).value()
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
ApplicantDialog.defaultProps = {
    show: true,
};

const select = (state) => ({
    who: state.home.applicantDialogWho.applicant,
    show: state.home.displayApplicantDialog
});
module.exports = connect(select)(ApplicantDialog);
