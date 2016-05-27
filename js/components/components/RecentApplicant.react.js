import React, {Component} from 'react';
import { Glyphicon, Media } from 'react-bootstrap';
import * as actions from '../../actions/AppActions.js';
import {connect} from 'react-redux';
import _ from 'lodash';

class RecentApplicant extends Component {
    componentDidMount() {
        this.props.dispatch(actions.fetchRecentApplicant(false));
    }
    render() {
        const props = this.props;
        const dispatch = props.dispatch;
        const recentApplicant = props.recentApplicant;
        return (
            <div>
                <div>
                    <h2>
                        <span>最近申请人</span>
                        <span>
                            <Glyphicon
                                className="header-refresh-icon"
                                glyph="refresh"
                                onClick={()=>dispatch(actions.fetchRecentApplicant())}/>
                        </span>
                    </h2>
                </div>

                <div>
                    {_.castArray(recentApplicant).map((item, index) => {
                        if (!item) {
                            return null;
                        }
                        return (
                            <Media key={index}>
                                <Media.Body>
                                    <Media.Heading componentClass='h4'>
                                        {`${item.department} ${item.applicant}`}
                                    </Media.Heading>
                                    <p>{`PMID: ${item.pmid}`}</p>
                                </Media.Body>
                            </Media>
                        );
                    })}
                </div>
            </div>
        ); // return
    }
}

const select = (state) => {
    return {
        recentApplicant: state.home.recentApplicant
    };
};

module.exports = connect(select)(RecentApplicant);
