import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import CategoryContainer from './components/CategoryContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Switch>
            <Route exact path="/" component={CategoryContainer} />
            <Route path="/:categoryId" component={CategoryContainer} />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
