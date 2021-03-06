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
                    <Link
                        to={`/articles/${article_id}`}
                        className="ArticleLink"
                    >
                        {title}
                    </Link>
                </h2>
                <div className="ArticleCardInfoContainer">
                    <div className="ArticleCardInfo ArticleCardAuthor">
                        <Link
                            to={`/users/${author}/articles`}
                            className="AuthorLink"
                        >
                            {author}
                        </Link>
                    </div>
                    <div className="ArticleCardInfo">{formattedDate}</div>
                    <div className="ArticleCardInfo">Comments: {comment_count}</div>
                    <div className="ArticleCardInfo">Votes: {votes}</div>
                </div>

            </div>
        );
    };
};

ArticleCard.propTypes = {
    article: PropTypes.shape({
        article_id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        created_at: PropTypes.string,
        comment_count: PropTypes.number,
        votes: PropTypes.number
    }).isRequired
};

export default ArticleCard;