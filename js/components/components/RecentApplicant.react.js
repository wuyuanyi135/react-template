import React, { Component } from 'react';
import { Glyphicon, Media } from 'react-bootstrap';
import * as actions from '../../actions/AppActions.js';
import * as applicantDialogActions from '../../actions/ApplicantDialogActions.js';
import { connect } from 'react-redux';
import _ from 'lodash';

class RecentApplicant extends Component {
    computeRecentApplicant() {
        const recentImport = this.props.recentImport;
        return _(recentImport)
          .map((item) => _.castArray(item.applicant)
            .map((it) => [{ applicant: it, pmid: item.pmid, articleTitle: item.articleTitle }]))
          .flattenDepth(2)
          .uniqWith((a, b) => a.applicant.applicant === b.applicant.applicant)
          .value();
    }
    render() {
        const props = this.props;
        const dispatch = props.dispatch;
        const recentApplicant = this.computeRecentApplicant();
        return (
            <div>
                <div>
                    <h2>
                        <span>最近申请人</span>
                        <span>
                            <Glyphicon
                              className="header-refresh-icon"
                              glyph="refresh"
                              onClick={() => dispatch(actions.fetchRecent())}
                            />
                        </span>
                    </h2>
                </div>

                <div>
                    {_.castArray(recentApplicant).map((item, index) => {
                        if (!item) {
                            return null;
                        }
                        const applicant = item.applicant;
                        return (
                            <Media key={index} onClick={() => dispatch(applicantDialogActions.displayDialog(true, applicant))}>
                                <Media.Body>
                                    <Media.Heading componentClass="h4">
                                        {`${applicant.department} ${applicant.applicant}`}
                                    </Media.Heading>
                                    {item.pmid ?
                                        <p>{`PMID: ${item.pmid}`}</p> :
                                        <p>{`Title: ${item.articleTitle}`}</p>
                                    }
                                </Media.Body>
                            </Media>
                        );
                    })}
                </div>
            </div>
        ); // return
    }
}

const select = (state) => ({
    recentImport: state.home.recentImport
});

module.exports = connect(select)(RecentApplicant);
