import React, {Component} from 'react';
import './App.css';
import shuffle from 'lodash.shuffle'
import words from './words.json';

const CHARS = genCharArray();
const DEFAULT_STATE = {
    word: chooseWord(),
    charsFound: [],
    charsClicked: [],
    won: false,
};

function chooseWord() {
    const shuffledWords = shuffle(words);
    return shuffledWords[0];
};

function genCharArray() {
    let chars = [];
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i += 1) {
        chars.push(String.fromCharCode(i));
    }
    return chars;
}

class App extends Component {
    state = {...DEFAULT_STATE};

    reset = () => {
        this.setState({...DEFAULT_STATE, word: chooseWord(), charsFound: [], charsClicked: []});
    }

    handleClick(char, e) {
        let {charsClicked, charsFound, word} = this.state;
        e.preventDefault();
        if (!charsClicked.includes(char)) {
            this.setState({charsClicked: [...this.state.charsClicked, char]});
            if (word.toUpperCase().includes(char)) {
                charsFound.push(char);
                this.setState({charsFound});
            }
            let missingLettersRegex = new RegExp("[^" + charsFound.join('') + "]", "i");
            if (!missingLettersRegex.test(word)) {
                this.setState({won: true}, () => {
                    setTimeout(this.reset, 2000);
                });
            }
        }
    }

    handlePhysicalKeyboardPress = (e) => {
        const char = e.key.toUpperCase();
        if (/^\w$/i.test(char)) {
            this.handleClick(char, e);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handlePhysicalKeyboardPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlePhysicalKeyboardPress);
    }

    render() {
        const {word, charsClicked, charsFound, won} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <section class={won ? "word won" : "word"}>
                        {word.split('').map((char) => (
                            charsFound.includes(char) || won ? char + " " : "_ "
                        ))}
                    </section>
                    <section class="keyboard">
                        {CHARS.map((char) => (
                            <button
                                class={charsClicked.includes(char) ? "char disabled" : "char"}
                                key={char}
                                onClick={(e) => this.handleClick(char, e)}
                            >
                                {char}
                            </button>
                        ))}
                    </section>
                    <section class="charsClicked">
                        {charsClicked.map((char) => (
                            char + " "
                        ))}
                    </section>
                </header>
            </div>
        );
    }

}

export default App;
