import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/header/header';
import ApiListContainerComponent from './components/api-list-container/api-list-container';
import ApiDetailComponent from './components/api-detail/api-detail';
import SpinnerComponent from './components/spinner/spinner';
import commitsReducer from './reducers/commits';
import APP_CONSTANTS from './config/app-constants';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faComment, faEnvelope, faEquals, faFileCode, faIdCardAlt, faMinusCircle, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faChevronLeft, faComment, faEnvelope, faEquals, faFileCode, faIdCardAlt, faMinusCircle, faPlusCircle, faUser);

const store = createStore(commitsReducer);

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
                  <Route exact path={APP_CONSTANTS.ROUTES.COMMITS} component={ApiListContainerComponent} />
                  <Route exact path={APP_CONSTANTS.ROUTES.COMMIT_DETAIL} component={ApiDetailComponent} />
                  <Redirect to={APP_CONSTANTS.ROUTES.COMMITS} />
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
