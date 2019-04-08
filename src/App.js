import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from './components/header-component/header-component';
import ApiListContainerComponent from './components/api-list-container-component/api-list-container-component';
import ApiDetailComponent from "./components/api-detail-component/api-detail-component";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import './App.css';

library.add(faComment)

class App extends Component {
  render() {
    return (
        <div>
          <header>
            <HeaderComponent />
          </header>
          <div className="app-container">
              <Router>
                  <Switch>
                      <Route exact path="/commits" component={ApiListContainerComponent} />
                      <Route exact path="/commits/:sha" component={ApiDetailComponent} />
                      <Route component={ApiListContainerComponent} />
                  </Switch>
              </Router>
          </div>
        </div>
    );
  }
}

export default App;
