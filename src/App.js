import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from './components/header-component/header-component';
import ApiListContainerComponent from './components/api-list-container-component/api-list-container-component';
import ApiDetailComponent from "./components/api-detail-component/api-detail-component";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faComment);

const initialState = {
    commits: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMMITS':
            return {
                commits: action.commits
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <header>
              <HeaderComponent />
            </header>
            <div className="app-container">
              <Switch>
                  <Route exact path="/commits" component={ApiListContainerComponent} />
                  <Route exact path="/commits/:sha" component={ApiDetailComponent} />
                  <Redirect to="/commits" />
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
