import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/header-component/header-component';
import ApiListContainerComponent from './components/api-list-container-component/api-list-container-component';

class App extends Component {
  render() {
    return (
        <div>
          <header>
            <HeaderComponent />
          </header>
          <div className="app-container">
            <ApiListContainerComponent />
          </div>
        </div>
    );
  }
}

export default App;
