import React, { Component } from 'react';
import getRandomColorPair from '../../helpers/randomColor';

import ColorWord from './components/ColorWord';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    const [color, word] = getRandomColorPair();
    this.state = {
      secondsLeft: 60,
      color: color,
      word: word,
      score: 0
    };
    this.tick = this.tick.bind(this);
    this.endGame = this.endGame.bind(this);
    this.nextColorWord = this.nextColorWord.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  tick() {
    this.setState(prevState => {
      return { secondsLeft: prevState.secondsLeft - 1 };
    });
    if (this.state.secondsLeft === 0) {
      this.endGame('time out');
    }
  }

  endGame(reason) {
    window.localStorage['last-score'] = this.state.score;
    window.localStorage['best-score'] = Math.max(
      window.localStorage['best-score'],
      this.state.score
    );
    window.clearInterval(this.timer);
    console.log(reason);
    window.setTimeout(this.props.goToMenuScreen, 2000);
  }

  nextColorWord() {
    const [color, word] = getRandomColorPair(color, word);
    this.setState({
      color,
      word
    });
  }

  handleYes() {
    const { color, word, score } = this.state;
    if (color === word) {
      this.setState({
        score: score + 1
      });
      this.nextColorWord();
    } else {
      this.endGame('oops, wrong answer!');
    }
  }

  handleNo() {
    const { color, word, score } = this.state;
    if (color !== word) {
      this.setState({
        score: score + 1
      });
      this.nextColorWord();
    } else {
      this.endGame('oops, wrong answer!');
    }
  }

  render() {
    const { goToMenuScreen } = this.props;
    const { secondsLeft, score, color, word } = this.state;
    return (
      <div>
        <p>{secondsLeft}</p>
        <p>{score}</p>
        <ColorWord color={color} word={word} />
        <div>
          <button onClick={this.handleNo}>NO</button>
          <button onClick={this.handleYes}>YES</button>
        </div>
        game screen <button onClick={goToMenuScreen}>exit</button>
      </div>
    );
  }
}

export default GameScreen;
