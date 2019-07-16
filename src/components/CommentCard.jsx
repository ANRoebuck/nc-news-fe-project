import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentCard extends Component {
    render() {
        const { body, author, votes, created_at } = this.props.comment
        return (
            <div className="CommentCard">
                <div className="CommentInfo">
                    <div className="CommentUser">User: {author}</div>
                    <div className="CommentDate">{created_at}</div>
                </div>
                <p className="CommentBody">
                    {body}
                </p>
                <div className="CommentVotes">
                    <div>Votes: {votes}</div>
                </div>
            </div>
        );
    }
}

CommentCard.propTypes = {

};

export default CommentCard;