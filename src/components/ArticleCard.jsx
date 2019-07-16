import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { formatDate } from './../utils/utils';

class ArticleCard extends Component {

    render() {
        const { article_id, title, author, created_at, comment_count, votes } = this.props.article;
        const formattedDate = formatDate(created_at);
        return (
            <tr>
                <td className="TableTitle">
                    <Link to={`/articles/${article_id}`}>
                        {title}
                    </Link>
                </td>
                <td className="TableAuthor">
                    <Link to={`/users/${author}/articles`}>
                        {author}
                    </Link>
                </td>
                <td className="TableCreatedAt">{formattedDate}</td>
                <td className="TableComments">{comment_count}</td>
                <td className="TableVotes">{votes}</td>
            </tr>

        );
    };
};

ArticleCard.propTypes = {

};

export default ArticleCard;