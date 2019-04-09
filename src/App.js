import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from './components/header-component/header-component';
import ApiListContainerComponent from './components/api-list-container-component/api-list-container-component';
import ApiDetailComponent from "./components/api-detail-component/api-detail-component";
import SpinnerComponent from "./components/spinner-component/spinner-component";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment, faEnvelope, faEquals, faFileCode, faIdCardAlt, faMinusCircle, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faComment, faEnvelope, faEquals, faFileCode, faIdCardAlt, faMinusCircle, faPlusCircle, faUser);

const initialState = {
    commits: [],
    commitDetail: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMMITS':
            return Object.assign({}, state, {
                commits: action.commits
            });
        case 'SET_COMMIT_DETAIL':
            return Object.assign({}, state, {
                commitDetail: action.commitDetail
            });
        case 'LOADING':
            return Object.assign({}, state, {
                loading: action.loading
            });
        default:
            return state;
    }
};

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <SpinnerComponent />
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
