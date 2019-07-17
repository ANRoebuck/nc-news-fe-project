import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getArticles } from './../utils/utils';
import ArticleCard from './ArticleCard';
import { async } from 'q';

class Articles extends Component {

    state = {
        articles: [],
        sort_by: 'created_at',
        order: 'desc'
    };

    render() {
        const { topic, author } = this.props;
        const { articles, sort_by, order } = this.state;
        const up = '⇈';
        const down = '⇊';

        return (
            <div>
                <h2
                    className="ArticlesHeader"
                >
                    {topic ? `Articles on ${topic}`
                    : author ? `Articles by ${author}`
                    : `All Articles`}
                </h2>
                <table className="ArticlesTable">
                    <thead className="TableHeader">
                        <tr>
                            <th
                                className="TableTitle"
                                id="title"
                                onClick={this.changeSort}
                            >
                                Title
                                 {sort_by === "title" 
                                    ? order === 'asc'
                                        ? up
                                        : down
                                    : null          }
                            </th>

                            <th
                                className="TableAuthor"
                                id="author"
                                onClick={this.changeSort}
                            >
                                Author
                                 {sort_by === "author" 
                                    ? order === 'asc'
                                        ? up
                                        : down
                                    : null          }
                            </th>

                            <th
                                className="TableCreatedAt"
                                id="created_at"
                                onClick={this.changeSort}
                            >
                                Date Published
                                 {sort_by === "author" 
                                    ? order === 'asc'
                                        ? up
                                        : down
                                    : null          }
                            </th>

                            <th
                                className="TableComments"
                                id="comment_count"
                                onClick={this.changeSort}
                            >
                                Comments
                                 {sort_by === "comment_count" 
                                    ? order === 'asc'
                                        ? up
                                        : down
                                    : null          }
                            </th>

                            <th
                                className="TableVotes"
                                id="votes"
                                onClick={this.changeSort}
                            >
                                Votes
                                 {sort_by === "votes" 
                                    ? order === 'asc'
                                        ? up
                                        : down
                                    : null          }
                            </th>
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
        const newSort = this.state.sort_by !== prevState.sort_by;
        const newOrder = this.state.order !== prevState.order;
        if (newTopic || newAuthor || newSort || newOrder) this.fetchArticles();
    };

    fetchArticles = async () => {
        const { topic, author } = this.props;
        const { sort_by, order } = this.state;
        const args = { topic, author, sort_by, order };
        const articles = await getArticles(args);
        this.setState({ articles });
    };

    changeSort = (event) => {
        const newSort = event.target.id;
        if (this.state.sort_by === newSort) this.changeOrder();
        else {
            const defaultDescend = ['created_at', 'votes', 'comment_count'];
            const order = (defaultDescend.includes(newSort) ? 'desc' : 'asc')
            const sort_by = newSort;
            this.setState({ sort_by, order })
        };
    };

    changeOrder = () => {
        const order = (this.state.order === 'asc' ? 'desc' : 'asc');
        this.setState({ order });
    };
};

Articles.propTypes = {

};

export default Articles;