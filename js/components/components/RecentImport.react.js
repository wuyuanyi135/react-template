import React from 'react';
import { Glyphicon, Media } from 'react-bootstrap';
import * as actions from '../../actions/AppActions.js';
import {connect} from 'react-redux';
const RecentImport = (props) => {
    const dispatch = props.dispatch;
    return (
        <div>
            <div>
                <h3>
                    <span>最新录入</span>
                    <span>
                        <Glyphicon
                            className="header-refresh-icon"
                            glyph="refresh"
                            onClick={()=>dispatch(actions.fetchRecentImport())}/>
                    </span>
                </h3>
            </div>

            <div>

            </div>
        </div>
    )
};

const select = (state) => {
    return {};
};

module.exports = connect(select)(RecentImport);
