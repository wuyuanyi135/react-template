import React, { Component } from 'react';
import { Glyphicon, Media } from 'react-bootstrap';
import * as actions from '../../actions/AppActions.js';
import * as indexActions from '../../actions/IndexActions.js';

import { connect } from 'react-redux';
import _ from 'lodash';

class RecentImport extends Component {
    componentDidMount() {
        this.props.dispatch(actions.fetchRecentImport(false));
    }
    render() {
        const props = this.props;
        const dispatch = props.dispatch;
        const recentImport = props.recentImport;
        return (
            <div>
                <div>
                    <h2>
                        <span>最新录入</span>
                        <span>
                            <Glyphicon
                                className="header-refresh-icon"
                                glyph="refresh"
                                onClick={()=>dispatch(actions.fetchRecentImport())}/>
                        </span>
                    </h2>
                </div>

                <div>
                    {_.castArray(recentImport).map((item, index) => {
                        if (!item) {
                            return null;
                        }
                        return (
                            <Media
                              key={index}
                              onClick={() => dispatch(indexActions.displayArticleDialog(item._id))}
                            >
                                <Media.Body>
                                    <Media.Heading componentClass="h4">
                                        {item.articleTitle}
                                    </Media.Heading>
                                    <p>{`PMID: ${item.pmid}`}</p>
                                    <p>{item.authors}</p>
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

module.exports = connect(select)(RecentImport);
