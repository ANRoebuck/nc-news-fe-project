import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    getArticleById,
    getArticleComments,
    postComment,
    deleteComment,
    patchComment
} from './../utils/utils';
import CommentCard from './CommentCard';


class ArticlePage extends Component {

    state = {
        article: {},
        comments: [],
        addComment: false,
        newComment: '',
        currentUser: 'happyamy2016'
    };
    
    render() {
        const { article, comments } = this.state;
        const { title, body, comment_count, votes, created_at, author, article_id } = article;
        
        return (

            <div>
                <h2 className="ArticleTitle">{title}</h2>
                <h3 className="ArticleAuthor">{author}</h3>
                <h3 className="ArticleCreated">{created_at}</h3>
                <p className="ArticleBody">{body}</p>

                <div className="ArticleFooter">

                    <form
                        className="AddComment"
                        id="AddComment"
                        onSubmit={this.handleSubmit}
                    >
                        <button
                            type="submit"
                            className="AddCommentButton"
                        >
                            Add Comment
                        </button>
                    </form>

                    <div> Comments: {comment_count}</div>
                    <div> Votes: {votes}</div>
                    <div className="ArticleVoteButtons">
                        <button
                                className="VoteUp voteButton"
                                id="ArticleUpVote"
                                value={article_id}
                                type="button"
                                onClick={this.handleSubmit}
                            >
                                Vote Up
                            </button>
                            <button
                                className="VoteDown voteButton"
                                id="ArticleDownVote"
                                value={article_id}
                                type="button"
                                onClick={this.handleSubmit}
                            >
                                Vote Down
                            </button>
                    </div>

                </div>

                {this.state.addComment === true && 
                    <form
                        className="NewCommentForm"
                        id="NewCommentForm"
                        onSubmit={this.handleSubmit}
                    >
                        <input
                            className="NewCommentInput"
                            type="text"
                            value={this.state.newComment}
                            id="NewCommentInput"
                            onChange={this.handleChange}>
                        </input>

                        <button
                            className="NewCommentCancelButton"
                            type="button"
                            id="CancelAddComment"
                            onClick={this.handleSubmit}
                        >
                                Cancel
                        </button>

                        <button
                            className="NewCommentSubmitButton"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                }

                <div>
                    {comments.length > 0 ?
                        <h3 className="CommentsHeader">Here are some comments</h3>
                        : null
                    }
                    {comments.map(comment => {
                        return (
                            <CommentCard
                                key={comment.comment_id}
                                comment={comment}
                                currentUser={this.state.currentUser}
                                handleSubmit={this.handleSubmit}
                            />
                        )
                    })}
                </div>

            </div>

        );
    };

    componentDidMount () {
        this.fetchArticle();
        this.fetchArticleComments();
    };

    handleSubmit = event => {
        event.preventDefault();
        const { id, value } = event.target;
        if (id === 'AddComment') this.setState({ addComment: true })
        if (id === 'CancelAddComment') this.setState({ addComment: false, newComment: '' })
        if (id === 'NewCommentForm') this.sendComment();
        if (id === 'CommentDelete') this.removeComment(value);
        if (id === 'CommentUpVote') this.voteComment(value, 1);
        if (id === 'CommentDownVote') this.voteComment(value, -1);
    };

    handleChange = event => {
        const { id, value } = event.target;
        if (id === 'NewCommentInput') this.setState({ newComment: value })
    };

    fetchArticle = async () => {
        const article = await getArticleById(this.props.article_id);
        this.setState({ article });
    };

    fetchArticleComments = async () => {
        const comments = await getArticleComments(this.props.article_id);
        this.setState({ comments });
    };

    sendComment = async () => {
        const newComment = {
            body: this.state.newComment,
            username: this.state.currentUser,
        }
        const article_id = this.props.article_id;
        
        postComment(newComment, article_id)
            .then(response => {
                this.setState({ newComment: '', addComment: false });
                return response;
            })
            .then(response => {
                this.fetchArticleComments();
                return response;
            })
            .then(response => {
                this.fetchArticle();
                return response;
            })
            .catch(err => {
                console.log(err);
            });
    };

    removeComment = async (value) => {
        deleteComment(value)
           .then(response => {
               this.fetchArticleComments();
               return response;
           })
           .then(response => {
               this.fetchArticle();
               return response;
           })
           .catch(err => {
               console.log(err);
           });
    };

    voteComment = async (comment_id, vote) => {
        patchComment(comment_id, vote)
            .then(response => {
                console.log(response);
                this.fetchArticleComments();
                return response;
            })
            .catch(err => {
                console.log(err);
            });
    };

};

ArticlePage.propTypes = {

};

export default ArticlePage;