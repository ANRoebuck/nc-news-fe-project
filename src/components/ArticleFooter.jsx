import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { conditionalExpression } from '@babel/types';

class ArticleFooter extends Component {

    render() {

        const { article_id, addComment, comment_count, votes } = this.props;

        return (

            <div className="ArticleFooter">

                <button
                    type="button"
                    className="AddCommentButton"
                    onClick={addComment}
                >
                    Add Comment 
                </button>

                <div> Comments: {comment_count}</div>
                <div> Votes: {votes}</div>

                <div className="ArticleVoteButtons">
                    <button
                        className="VoteUp voteButton"
                        id="ArticleUpVote"
                        value={article_id}
                        type="button"
                        onClick={this.placeholder}
                    >
                        Vote Up
                    </button>
                    <button
                        className="VoteDown voteButton"
                        id="ArticleDownVote"
                        value={article_id}
                        type="button"
                        onClick={this.placeholder}
                    >
                        Vote Down
                    </button>
                </div>

            </div>
        );
    }

    placeholder = () => {
        console.log('article vote button pressed')
    }
}

ArticleFooter.propTypes = {
    article_id: PropTypes.number.isRequired,
    comment_count: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    addComment: PropTypes.func
};

export default ArticleFooter;