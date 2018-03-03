import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

function CompList(props) {
  console.log("props", props);
  let {categoryId = ''} = props.match.params;
  if (categoryId != 'category') {
    props.history.push('/not_found');
  }
  return (<div>CompList</div>)
}

function NotFound(props) {
  console.log("props", props);
  return (<div>Page not Found</div>)
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            <div>
              root
            </div>)} />
          <Route exact path="/not_found" component={NotFound} />
          <Route exact path="/:categoryId" component={CompList} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
