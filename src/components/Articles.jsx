import React, { Component } from 'react';
import { getArticles } from './../utils/utils';
import ArticleCard from './ArticleCard';
import ArticleSortButton from './ArticleSortButton';
import '../css/Articles.css'
import '../css/Loading.css'

class Articles extends Component {

    state = {
        loaded: false,
        articles: [],
        sort_by: 'created_at',
        order: 'desc'
    };

    render() {
        const { topic, author } = this.props;
        const { articles, sort_by, order, loaded } = this.state;
        const sortCategories = [
            { id: 'title', category: 'Title' },
            { id: 'author', category: 'Author' },
            { id: 'created_at', category: 'Published' },
            { id: 'comment_count', category: 'Comments' },
            { id: 'votes', category: 'Votes' }
        ]

        return (

            loaded === true
            ?
                <div className="ArticlesContainer">

                    <h2 className="ArticlesHeader">
                        {topic ? `Articles on ${topic}`
                        : author ? `Articles by ${author}` : `All Articles`}
                    </h2>

                    <div className="ArticlesSortButtons">
                        <div className="ArticleSort SortHeader">
                            Sort by:
                        </div>
                        {sortCategories.map(sortCategory => 
                            <ArticleSortButton
                                sortCategory={sortCategory}
                                changeSort={this.changeSort}
                                sort_by={sort_by}
                                order={order}
                            />
                        )}
                    </div>
                    
                    <div className="ArticleCardsContainer">
                        {articles.map(article =>
                            <ArticleCard
                                key={article.article_id}
                                article={article}
                            />
                        )}
                    </div>

                </div>
            :
            //loading articles
                <div className="LoadingContainer">
                    <div className="LoadingMessage">
                        Loading articles ...
                    </div>
                    <div id="loader-wrapper">
                        <div id="loader"></div>
                    </div>
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
        this.setState({ articles, loaded: true });
    };

    changeSort = (event) => {
        const newSort = event.target.id;
        if (this.state.sort_by === newSort) this.changeOrder();
        else {
            const defaultDescend = ['created_at', 'votes', 'comment_count'];
            const order = (defaultDescend.includes(newSort) ? 'desc' : 'asc')
            this.setState({ sort_by: newSort, order })
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


export default Articles;