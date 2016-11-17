import React, { Component } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as importActions from '../../actions/ImportFormActions';

const LoadButton = connect()((props) => (
    <Button
      block
      bsStyle="info"
      disabled={!/^\S{4}\-\S{4}/.test(props.issn)}
      onClick={() => props.dispatch(importActions.updateSci(props.issn))}
    >点击更新SCI数据</Button>
));

@connect()
class LoadProgress extends Component {
    constructor() {
        super();
        this.state = {
            now: 0
        };
    }
    componentDidMount() {
        this._timer = setInterval(() => {
            let now = this.state.now;
            if (now >= 100) {
                clearInterval(this._timer);
            } else {
                now += 100 * this.props.updateInterval / this.props.expectedDuration;
                now = now > 100 ? 100 : now;
                this.setState({ now });
            }
        }, this.props.updateInterval);
    }
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    render() {
        const { now } = this.state;
        return <ProgressBar active now={now} />;
    }
}
LoadProgress.defaultProps = {
    expectedDuration: 5000,
    updateInterval: 500
};

const sciConnect = (state) => ({
    isUpdatingSciTable: state.importForm.isUpdatingSciTable
});

const SciUpdateButton = connect(sciConnect)((props) => {
    const { isUpdatingSciTable, issn } = props;

    return (
        <div>
            {isUpdatingSciTable ? <LoadProgress /> : <LoadButton issn={issn} />}
        </div>
    );
});

SciUpdateButton.defaultProps = {
    isUpdatingSciTable: false
};

export default SciUpdateButton;
