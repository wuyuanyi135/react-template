import React from 'react';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions/ImportFormActions.js';

const validateForm = (data = {}) => (
    _.every([
        data.authors,
        // data.pmid,
        data.selectedISSN,
        data.selectedPublicationTypes,
        data.selectedAffiliation,
        data.source,
        data.articleTitle
    ])
);

export const ImportButton = connect()((props) => {
    const { data, dispatch, ...restProps } = props;
    return (
        <Button
          bsStyle="primary"
          className="import-form-submit"
          disabled={!validateForm(data)}
          onClick={() => dispatch(actions.submitImportFormAsync(data))}
          {...restProps}
        >
            添加条目
        </Button>
    );
});
