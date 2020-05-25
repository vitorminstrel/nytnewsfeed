import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './components/Home/Home';
import { ArticleDetails } from './components/ArticleDetails/ArticleDetails';

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/article/:id" render={(m) => <ArticleDetails {...m.match.params} />} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}
export default App;
