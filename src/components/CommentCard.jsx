import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate, patchVotes } from './../utils/utils';
import VoteButton from './VoteButton';

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
                    <div className="VoteScore">Votes: {votes + voteChange}</div>
                    {author !== currentUser ?
                        <div className="VoteButtons">
                            <VoteButton
                                label="Vote Up"
                                id={comment_id}
                                segment="comments"
                                inc_votes={1}
                                sendVote={this.sendVote}
                                voted={voteChange === 1}
                            />
                            <VoteButton
                                label="Vote Down"
                                id={comment_id}
                                segment="comments"
                                inc_votes={-1}
                                sendVote={this.sendVote}
                                voted={voteChange === -1}
                            />
                        </div>
                        :
                        <div className="VoteButtons">
                            <button
                                className="CommentDelete"
                                id="CommentDelete"
                                value={comment_id}
                                type="button"
                                onClick={removeComment}
                            >
                                Delete Comment
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

};

export default CommentCard;