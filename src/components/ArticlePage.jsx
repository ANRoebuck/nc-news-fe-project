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
import CommentForm from './CommentForm';
import ArticleFooter from './ArticleFooter';


class ArticlePage extends Component {

    state = {
        article: {
            article_id: 0,
            votes: 0,
            comment_count: 0
        },
        comments: [],
        addComment: false,
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
                <ArticleFooter
                    className="ArticleFooter"
                    article_id={article_id}
                    addComment={this.addComment}
                    comment_count={comment_count}
                    votes={votes}
                />

                {this.state.addComment === true &&
                    <CommentForm
                        cancelAddComment={this.cancelAddComment}
                        sendComment={this.sendComment}
                        currentUser={this.state.currentUser}
                    />
                }

                {comments.length > 0 &&
                    <div className="CommentSection">
                        <h3 className="CommentsHeader">Here are some comments</h3>
                        {comments.map(comment => (
                            <CommentCard
                                key={comment.comment_id}
                                comment={comment}
                                currentUser={this.state.currentUser}
                                handleSubmit={this.handleSubmit}
                            />
                        ))}
                    </div>
                }

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

    addComment = () => {
        this.setState({ addComment: true });
    };
    cancelAddComment = () => {
        this.setState({ addComment: false });
    };

    sendComment = async (newComment) => {
        postComment(newComment, this.props.article_id)
            .then(postedComment => {
                this.setState(state => {
                    return {
                        comments: [ postedComment, ...this.state.comments ],
                        article: {
                            ...this.state.article,
                            comment_count: (this.state.article.comment_count) +1
                        },
                        addComment: false,
                        currentUser: this.state.currentUser
                    };
                });
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