import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getArticles } from './../utils/utils';
import ArticleCard from './ArticleCard';

class Articles extends Component {

    state = {
        articles: []
    };

    render() {
        const { topic } = this.props;
        const { articles } = this.state;

        return (
            <div>
                <h2 className="ArticlesHeader">{topic ? `Articles on ${topic}` : `All Articles`}</h2>
                {articles.map(article => {
                    const { article_id } = article;
                    return (
                        <ArticleCard
                            key={article_id}
                            article={article}
                        />
                    );
                })}
            </div>
        );
    };

    componentDidMount () {
        this.fetchArticles();
    };

    componentDidUpdate (prevProps, prevState) {
        const newTopic = this.props.topic !== prevProps.topic;
        if (newTopic) this.fetchArticles();
    };

    fetchArticles = async () => {
        const articles = await getArticles(this.props.topic);
        this.setState({ articles });
    };
};

Articles.propTypes = {

};

export default Articles;