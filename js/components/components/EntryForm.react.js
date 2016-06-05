import React, { Component } from 'react';
import { PanelGroup, Panel } from 'react-bootstrap';
import PMIDPanel from './PMIDPanel.react';
import ApplicantPanel from './ApplicantPanel.react.js';
import AuthorPanel from './AuthorPanel.react';
import ArticleInfoPanel from './ArticleInfoPanel.react.js';
import { connect } from 'react-redux';

const EntryForm = (props) => {
    const frm = props.frm;
    const data = frm.data;
    const dispatch = props.dispatch;
    const applicantPanelProps = { applicant: data.applicant };
    const pmidPanelProps = { isLoading: frm.isLoading, pmid: data.pmid };
    const authorPanelProps = {
        affiliation: data.affiliation,
        authors: data.authors,
        selectedAffiliation: data.selectedAffiliation
    };
    const articleInfoPanelProps = {
        source: data.source,
        issn: data.issn,
        selectedISSN: data.selectedISSN,
        selectedPublicationTypes: data.selectedPublicationTypes,
        articleTitle: data.articleTitle,
        pt: data.pt
    };
    return (
        <div>
            <PanelGroup accordion>
                <ApplicantPanel eventKey="0" {...applicantPanelProps} />
                <PMIDPanel eventKey="1" {...pmidPanelProps} />
                <AuthorPanel eventKey="2" {...authorPanelProps} />
                <ArticleInfoPanel eventKey="3" {...articleInfoPanelProps} />
            </PanelGroup>
        </div>
    );
};


function select(state) {
    return {
        data: state.importForm.data,
        frm: state.importForm
    };
}
export default connect(select)(EntryForm);
