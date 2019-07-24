import React, { Component } from 'react';
import { navigate } from '@reach/router'
import PropTypes from 'prop-types';
import {
    getArticleById,
    getArticleComments,
    postComment,
    deleteComment,
    formatDate
} from './../utils/utils';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import ArticleFooter from './ArticleFooter';
import '../css/ArticlePage.css'
import '../css/Loading.css'

class ArticlePage extends Component {

    state = {
        loadedArticle: false,
        loadedComments: false,
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
        const { article, comments, loadedArticle, loadedComments } = this.state;
        const { title, body, comment_count, votes, created_at, author, article_id } = article;
        const formattedDate = created_at ? formatDate(created_at) : null;
        
        return (
            <div>

                {loadedArticle === true
                ?
                    <div>
                        <h2 className="ArticleTitle">{title}</h2>
                        <h3 className="ArticleAuthor">{author}</h3>
                        <h3 className="ArticleCreated">{formattedDate}</h3>
                        <p className="ArticleBody">{body}</p>
                        
                        <ArticleFooter
                            className="ArticleFooter"
                            article_id={article_id}
                            comment_count={comment_count}
                            votes={votes}
                            addComment={this.addComment}
                        />

                        {this.state.addComment === true &&
                            <CommentForm
                                className="CommentForm"
                                currentUser={this.state.currentUser}
                                cancelAddComment={this.cancelAddComment}
                                sendComment={this.sendComment}
                            />
                        }

                        {loadedComments === true
                        ?
                            <div className="CommentSection">
                                <h3 className="CommentsHeader">
                                    {comments.length > 0
                                        ? `Comments` 
                                        : `Be the first to comment...`}
                                </h3>
                                {comments.map(comment => (
                                    <CommentCard
                                        key={comment.comment_id}
                                        comment={comment}
                                        currentUser={this.state.currentUser}
                                        removeComment={this.removeComment}
                                    />
                                ))}
                            </div>
                        :
                            null  //loading comments
                        }

                    </div>
                :
                //loading article
                    <div className="LoadingContainer">
                        <div className="LoadingMessage">
                            Loading article...
                        </div>
                        <div id="loader-wrapper">
                            <div id="loader"></div>
                        </div>
                    </div>
                }

            </div>
        );
    };

    componentDidMount () {
        this.fetchArticle();
        this.fetchArticleComments();
    };

    fetchArticle = async () => {
        try {
            const article = await getArticleById(this.props.article_id);
            this.setState({ article, loadedArticle: true });
        }
        catch (err) {
            console.log(err.response);
            navigate('/error', {
                replace: true,
                state: {
                    status: err.response.status,
                    message: err.response.data.message
                }
            })
        }
    };

    fetchArticleComments = async () => {
        const comments = await getArticleComments(this.props.article_id);
        this.setState({ comments, loadedComments: true });
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
                        ...state,
                        comments: [ postedComment, ...this.state.comments ],
                        article: {
                            ...state.article,
                            comment_count: (state.article.comment_count) +1
                        },
                        addComment: false
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    removeComment = async event => {
        const value = parseInt(event.target.value);
        const updatedComments = this.state.comments.filter(comment => comment.comment_id !== value );

        this.setState({ comments: updatedComments })

        deleteComment(value)
           .catch(err => {
               console.log(err);
           });
    };
};

ArticlePage.propTypes = {
    article_id: PropTypes.number.isRequired
};

export default ArticlePage;