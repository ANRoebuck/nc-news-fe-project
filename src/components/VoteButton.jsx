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
    label : PropTypes.string.isRequired,
    voted: PropTypes.bool.isRequired,
    segment: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    inc_votes: PropTypes.number.isRequired,
    sendVote: PropTypes.func.isRequired
};

export default VoteButton;