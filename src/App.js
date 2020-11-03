import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import words from './words.json';

class App extends Component {
  state = {
    word: words[0],
  };

  chooseWord() {
    this.word = words[0];
  };

  render() {
      const { word } = this.state;
    return (
        <div className="App">
          <header className="App-header">
              {word.split('').map((char, index) => (
                  "_ "
              ))}
          </header>
        </div>
    );
  }

}

export default App;
