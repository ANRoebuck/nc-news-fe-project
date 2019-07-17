import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VoteButton extends Component {

    render() {
        const { label, voted } = this.props;
        return (
            <button
                type="button"
                className="VoteButton"
                onClick={this.vote}
                disabled={voted}
            >
                {label}
            </button>
        );
    };

    vote = () => {
        const { segment, id, inc_votes, sendVote } = this.props;
        sendVote(segment, id, inc_votes);
    };

};

VoteButton.propTypes = {

};

export default VoteButton;