import React, { Component } from 'react';
import './App.css';
import words from './words.json';

const CHARS = genCharArray();

function genCharArray() {
    let chars = [];
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i += 1) {
        chars.push(String.fromCharCode(i));
    }
    return chars;
}

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
              <section class="keyboard">
                  {CHARS.map((char, index) => (
                      <button class="char">{char}</button>
                  ))}
              </section>
          </header>
        </div>
    );
  }

}

export default App;
