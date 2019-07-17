import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './App.css';
import Nav from './components/Nav'
import Articles from './components/Articles'
import ArticlePage from './components/ArticlePage'
import { getTopics } from './utils/utils';


class App extends Component {

  state = {
    topics: []
  };

  render () {
    const { topics } = this.state;

    return (
      <div className="App">
        <h1 className="Title">{`< NC-News />`}</h1>
        <Nav topics={topics}></Nav>
        <Router className="Router">
          <Articles path="/" />
          <Articles path="/topics/:topic" />
          <Articles path="/users/:author/articles" />
          <ArticlePage path="/articles/:article_id" />
        </Router>
        <footer className="Footer">
          <h3>This is a footer, it goes at the bottom</h3>
        </footer>
      </div>
    );
  };

  componentDidMount () {
    this.fetchTopics();
  };

  componentDidUpdate (prevProps, prevState) {
  };
  
  fetchTopics = async () => {
    const topics = await getTopics();
    this.setState({ topics });
  };

};


export default App;
