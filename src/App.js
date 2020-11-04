import React, {Component} from 'react';
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
        charsFound: [],
        charsClicked: []
    };

    chooseWord() {
        this.word = words[0];
    };

    handleClick(char, e) {
        let {charsClicked, charsFound, word} = this.state;
        e.preventDefault();
        if (!charsClicked.includes(char)) {
            this.setState({charsClicked: [...this.state.charsClicked, char]});
            if (word.toUpperCase().includes(char)) {
                this.setState({charsFound: [...charsFound, char]});
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
        const {word, charsClicked, charsFound} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <section class="word">
                        {word.split('').map((char, index) => (
                            charsFound.includes(char) ? char + " " : "_ "
                        ))}
                    </section>
                    <section class="keyboard">
                        {CHARS.map((char, index) => (
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
                        {charsClicked.map((char, index) => (
                            char + " "
                        ))}
                    </section>
                </header>
            </div>
        );
    }

}

export default App;
