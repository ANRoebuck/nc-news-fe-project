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
        const headers = [
            { className: 'TableTitle', id: 'title', heading: 'Title' },
            { className: 'TableAuthor', id: 'author', heading: 'Author' },
            { className: 'TableCreatedAt', id: 'created_at', heading: 'Date Published' },
            { className: 'TableComments', id: 'comment_count', heading: 'Comments' },
            { className: 'TableVotes', id: 'votes', heading: 'Votes' }
        ]
        return (
            <div>

                <h2 className="ArticlesHeader">
                    {topic ? `Articles on ${topic}`
                    : author ? `Articles by ${author}`
                    : `All Articles`}
                </h2>

                <table className="ArticlesTable">

                    <thead className="TableHeader">
                        <tr>
                            {headers.map(header => {
                                const { className, id, heading } = header;
                                return (
                                    <th
                                        className={className}
                                        id={id}
                                        key={`header${id}`}
                                        onClick={this.changeSort}
                                    >
                                    {`< ${heading} />`}
                                     {sort_by === id
                                        ? order === 'asc'
                                            ? ` ${up}`
                                            : ` ${down}`
                                        : null          }
                                    </th>
                                )
                            })}

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
        if (newTopic || newAuthor) this.resetSort();
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

    resetSort = () => {
        this.setState({ sort_by: 'created_at', order: 'desc' })
    };
};

Articles.propTypes = {

};

export default Articles;