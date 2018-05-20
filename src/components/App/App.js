import React, { Component } from 'react';
import './App.css';
import Header from './../Header/Header'
import Sidebar from './../Sidebar/Sidebar'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header></Header>
        <div className="body">
          <Sidebar></Sidebar>
          <div className="content">
            <p className="app-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
