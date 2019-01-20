import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    console.log(process.env.key)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
          <p>
  
          </p>
     
    
        </header>
      </div>
    );
  }
}

export default App;
