import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { patchVotes } from './../utils/utils';
import VoteButton from './VoteButton';
import '../css/ArticleFooter.css';

class ArticleFooter extends Component {

    state = {
        voteChange: 0
    };

    render() {

        const { article_id, addComment, comment_count, votes } = this.props;
        const { voteChange } = this.state;

        return (

            <div className="ArticleFooter">
                
                <div className = "ArticleFooterCommentsInfo">

                    <div className="ArticleFooterCommentCount">
                        Comments: {comment_count}
                    </div>

                    <button
                        className="ArticleFooterCommentAdd"
                        type="button"
                        onClick={addComment}
                    >
                        Add Comment 
                    </button>

                </div>


                <div className="ArticleFooterVotesInfo">
                    <VoteButton
                        label="+"
                        inc_votes={1}
                        id={article_id}
                        segment="articles"
                        sendVote={this.sendVote}
                        voted={voteChange === 1}
                    />
                    <div className="ArticleFooterVoteCount"> Votes: {votes + voteChange}</div>
                    <VoteButton
                        label="-"
                        id={article_id}
                        segment="articles"
                        inc_votes={-1}
                        sendVote={this.sendVote}
                        voted={voteChange === -1}
                    />
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
}

ArticleFooter.propTypes = {
    article_id: PropTypes.number.isRequired,
    comment_count: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    addComment: PropTypes.func
};

export default ArticleFooter;