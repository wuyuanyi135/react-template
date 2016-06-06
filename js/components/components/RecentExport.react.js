import React, { Component } from 'react';
import { Glyphicon, Media } from 'react-bootstrap';
import * as actions from '../../actions/AppActions.js';
import * as indexActions from '../../actions/IndexActions.js';
import { connect } from 'react-redux';
import _ from 'lodash';

class RecentExport extends Component {

    render() {
        const { recentExport, dispatch } = this.props;
        return (
            <div>
                <div>
                    <h2>
                        <span>最近打印</span>
                        <span>
                            <Glyphicon
                                className="header-refresh-icon"
                                glyph="refresh"
                                onClick={()=>dispatch(actions.fetchRecent())}/>
                        </span>
                    </h2>
                </div>

                <div>
                    {_.castArray(recentExport).map((item, index) => {
                        if (!item) {
                            return null;
                        }
                        return (
                            <Media
                              key={index}
                              onClick={() => dispatch(indexActions.displayArticleDialog(item.refId))}
                              className="recent-item"
                            >
                                <Media.Body>
                                    <Media.Heading componentClass="h4">
                                        {item.articleTitle}
                                    </Media.Heading>
                                    <p>{`PMID: ${item.pmid}`}</p>
                                </Media.Body>
                            </Media>
                        );
                    })}
                </div>
            </div>
        );
    }
}


const select = (state) => ({
    recentExport: state.home.recentExport
});

module.exports = connect(select)(RecentExport);
