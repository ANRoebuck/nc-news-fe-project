import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { formatDate } from './../utils/utils';
import '../css/ArticleCard.css';

class ArticleCard extends Component {

    render() {
        const { article_id, title, author, created_at, comment_count, votes } = this.props.article;
        const formattedDate = formatDate(created_at);

        return (
            <div className="ArticleCard">
                <h2 className="ArticleCardTitle">
                    <Link to={`/articles/${article_id}`}>
                        {title}
                    </Link>
                </h2>
                <div className="ArticleCardInfoContainer">
                    <div className="ArticleCardInfo">
                        <Link to={`/users/${author}/articles`}>
                            {author}
                        </Link>
                    </div>
                    <div className="ArticleCardInfo">{formattedDate}</div>
                    <div className="ArticleCardInfo">Comments: {comment_count}</div>
                    <div className="ArticleCardInfo">Votes: {votes}</div>
                </div>
            </div>
        )

    };
};

ArticleCard.propTypes = {

};

export default ArticleCard;