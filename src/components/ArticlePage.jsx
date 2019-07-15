import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArticlePage extends Component {

    state = {
        article: {}
    };
    
    render() {
        const { article } = this.props;
        return (
            <div>
                <h2>{article.title}</h2>
            </div>
        );
    };
};

ArticlePage.propTypes = {

};

export default ArticlePage;