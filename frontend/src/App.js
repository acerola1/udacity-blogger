import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostList from './components/PostList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function NotFound(props) {
  console.log("props", props);
  return (<div>Page not Found</div>);
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Switch>
            <Route exact path="/" component={PostList} />
            <Route exact path="/not_found" component={NotFound} />
            <Route exact path="/:categoryId" component={PostList} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
