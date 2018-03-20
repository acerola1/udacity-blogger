import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostListPage from './components/PostListPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostPage from './components/PostPage';
import NewPostPage from './components/NewPostPage';
import Error from './components/Error';

class App extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Switch>
            <Route exact path="/" component={PostListPage} />
            <Route exact path="/new-post" component={NewPostPage} />
            <Route exact path="/:categoryPath/:postId" component={PostPage} />
            <Route exact path="/:categoryPath/:postId/:mode" component={PostPage} />
            <Route path="/:categoryPath" component={PostListPage} />
          </Switch>
          <Error />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
