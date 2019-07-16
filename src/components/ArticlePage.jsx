import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getArticleById, getArticleComments } from './../utils/utils';
import CommentCard from './CommentCard';


class ArticlePage extends Component {

    state = {
        article: {},
        comments: []
    };
    
    render() {
        const { article, comments } = this.state;
        const { title, body, comment_count, votes, created_at } = article;
        return (
            <div>
                <h2>{title}</h2>
                <div>{created_at}</div>
                <p>{body}</p>
                <div className="ArticleScore">
                    <div> Comments: {comment_count}</div>
                    <div> Votes: {votes}</div>
                </div>
                <div>
                    {comments.length > 0 ?
                        <div>Here are some comments</div>
                        : null
                    }
                    {comments.map(comment => {
                        return (
                            <CommentCard
                                key={comment.comment_id}
                                comment={comment}
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

    fetchArticle = async () => {
        const article = await getArticleById(this.props.article_id);
        this.setState({ article });
    };

    fetchArticleComments = async () => {
        const comments = await getArticleComments(this.props.article_id);
        this.setState({ comments });
    };
};

ArticlePage.propTypes = {

};

export default ArticlePage;