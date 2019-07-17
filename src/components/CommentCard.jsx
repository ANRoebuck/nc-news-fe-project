import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from './../utils/utils';

class CommentCard extends Component {

    state = {
        currentUser: ''
    };

    render() {
        const { comment, handleSubmit } = this.props;
        const { body, author, votes, created_at, comment_id } = comment;
        const formattedDate = created_at ? formatDate(created_at) : '...just now';
        return (
            <div className="CommentCard">
                <div className="CommentInfo">
                    <div className="CommentUser">User: {author}</div>
                    <div className="CommentDate">{formattedDate}</div>
                </div>
                <p className="CommentBody">
                    {body}
                </p>
                <div className="CommentVotes">
                    <div className="VoteScore">Votes: {votes}</div>
                    {author !== this.state.currentUser ?
                        <div className="VoteButtons">
                            <button
                                className="VoteUp voteButton"
                                id="CommentUpVote"
                                value={comment_id}
                                type="button"
                                onClick={handleSubmit}
                            >
                                Vote Up
                            </button>
                            <button
                                className="VoteDown voteButton"
                                id="CommentDownVote"
                                value={comment_id}
                                type="button"
                                onClick={handleSubmit}
                            >
                                Vote Down
                            </button>
                        </div>
                        :
                        <div className="VoteButtons">
                            <button
                                className="CommentDelete"
                                id="CommentDelete"
                                value={comment_id}
                                type="button"
                                onClick={handleSubmit}
                            >
                                Delete Comment
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    };

    componentDidMount () {
        this.setState({ currentUser: this.props.currentUser });
    };

};

CommentCard.propTypes = {

};

export default CommentCard;