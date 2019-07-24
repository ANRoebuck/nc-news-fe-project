import React, { Component } from 'react';
import { Router } from '@reach/router';
import './css/App.css';
import Nav from './components/Nav';
import Articles from './components/Articles';
import ArticlePage from './components/ArticlePage';
import Error from './components/Error';


class App extends Component {

  render () {

    return (
      <div className="App">

        <h1 className="Title">{`< NC-News />`}</h1>
        <Nav/>

        <Router className="Router" primary={false}>
          <Articles path="/" />
          <Articles path="/topics/:topic" />
          <Articles path="/users/:author/articles" />
          <ArticlePage path="/articles/:article_id" />
          <Error default path="/error" />
        </Router>

        <footer className="Footer">
          <h3>{`< A Roebuck - 2019 />`}</h3>
        </footer>

      </div>
    );
  };
};


export default App;
