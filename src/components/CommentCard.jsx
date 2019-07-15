import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentCard extends Component {
    render() {
        const { body, author, votes, created_at } = this.props.comment
        return (
            <div className="CommentCard">
                <div className="CommentBody">
                    {body}
                </div>
                <div className="CommentFooter">
                    <div>User: {author}</div>
                    <div>{created_at}</div>
                    <div>Votes: {votes}</div>
                </div>
            </div>
        );
    }
}

CommentCard.propTypes = {

};

export default CommentCard;