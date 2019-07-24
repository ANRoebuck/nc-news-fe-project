import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate, patchVotes } from './../utils/utils';
import VoteButton from './VoteButton';
import '../css/CommentCard.css';

class CommentCard extends Component {

    state = {
        voteChange: 0
    };

    render() {
        const { comment, currentUser, removeComment } = this.props;
        const { body, author, votes, created_at, comment_id } = comment;
        const formattedDate = formatDate(created_at);
        const { voteChange } = this.state;

        return (
            <div className="CommentCard">

                <div className="CommentInfo">
                    <div className="CommentUser">User: {author}</div>
                    <div className="CommentDate">{formattedDate}</div>
                </div>

                <p className="CommentBody">{body}</p>

                <div className="CommentVotes">
                    {author !== currentUser
                    ?
                        <div className="OtherUserVotes">
                            <VoteButton
                                className="VoteUp"
                                label="+"
                                id={comment_id}
                                segment="comments"
                                inc_votes={1}
                                sendVote={this.sendVote}
                                voted={voteChange === 1}
                            />
                            <div className="OtherUserScore">
                                Votes: {votes + voteChange}
                            </div>
                            <VoteButton
                                className="VoteDown"
                                label="-"
                                id={comment_id}
                                segment="comments"
                                inc_votes={-1}  
                                sendVote={this.sendVote}
                                voted={voteChange === -1}
                            />
                        </div>
                    :
                        <div className="OwnUserVotes">
                            <div className="OwnUserScore">
                                Votes: {votes + voteChange}
                            </div>
                            <button
                                className="CommentDelete"
                                id="CommentDelete"
                                value={comment_id}
                                type="button"
                                onClick={removeComment}
                            >
                                Delete
                            </button>
                        </div>
                    }

                </div>

            </div>
        );
    };

    sendVote = async (segment, id, inc_votes) => {
        this.setState(state => {
            return {
                voteChange: state.voteChange + inc_votes
            };
        });

        patchVotes(segment, id, inc_votes)
            .catch(err => {
                console.log(err)
            });
    };

};

CommentCard.propTypes = {
    comment: PropTypes.shape({
        body: PropTypes.string,
        author: PropTypes.string,
        votes: PropTypes.number,
        created_at: PropTypes.string,
        comment_id: PropTypes.number
    }).isRequired,
    currentUser: PropTypes.string.isRequired,
    removeComment: PropTypes.func.isRequired
};

export default CommentCard;