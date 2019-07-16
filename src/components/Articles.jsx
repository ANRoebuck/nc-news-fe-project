import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getArticles } from './../utils/utils';
import ArticleCard from './ArticleCard';

class Articles extends Component {

    state = {
        articles: []
    };

    render() {
        const { topic, author } = this.props;
        const { articles } = this.state;

        return (
            <div>
                <h2
                    className="ArticlesHeader"
                >
                    {topic ? `Articles on ${topic}`
                    : {author} ? `Articles by ${author}`
                    : `All Articles`}
                </h2>
                <table className="ArticlesTable">
                    <thead className="TableHeader">
                        <tr>
                            <th className="TableTitle">Title</th>
                            <th className="TableAuthor">Author</th>
                            <th className="TableCreatedAt">Date Published</th>
                            <th className="TableComments">Comments</th>
                            <th className="TableVotes">Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article => {
                            const { article_id } = article;
                            return (
                                <ArticleCard key={article_id} article={article}/>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    componentDidMount () {
        this.fetchArticles();
    };

    componentDidUpdate (prevProps, prevState) {
        const newTopic = this.props.topic !== prevProps.topic;
        const newAuthor = this.props.author !== prevProps.author;
        if (newTopic || newAuthor) this.fetchArticles();
    };

    fetchArticles = async () => {
        const args = { topic: this.props.topic, author: this.props.author };
        const articles = await getArticles(args);
        this.setState({ articles });
    };
};

Articles.propTypes = {

};

export default Articles;