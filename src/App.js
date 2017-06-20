import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Formatter from './components/Fomatter/Formatter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Formatter />
      </div>
    );
  }
}

export default App;
