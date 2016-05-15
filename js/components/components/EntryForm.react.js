import React from 'react';
import PMIDPanel from './PMIDPanel.react';
import ApplicantPanel from './ApplicantPanel.react.js';
import AuthorPanel from './AuthorPanel.react';
import ArticleInfoPanel from './ArticleInfoPanel.react.js';
const EntryForm = () => (
    <div>
        <form>
            <ApplicantPanel />
            <PMIDPanel />
            <AuthorPanel />
            <ArticleInfoPanel />
        </form>
    </div>
);

export default EntryForm;
