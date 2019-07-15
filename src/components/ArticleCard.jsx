import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

class ArticleCard extends Component {

    render() {
        const { article } = this.props;
        return (
            <Link
                to={`/articles/${article.article_id}`}
            >
            {article.title}
            </Link>
        );
    };
};

ArticleCard.propTypes = {

};

export default ArticleCard;