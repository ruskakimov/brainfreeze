import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import getRandomColorPair from '../../helpers/randomColor';

import Button from '../components/Button';
import ColorWord from './components/ColorWord';

const ButtonPanel = styled.div`
  display: flex;
  justify-content: space-around;
  width: 99%;
  position: absolute;
  bottom: 3rem;
  transform: translateY(-50%);
`;

const YesButton = Button.extend`
  color: green;
`;

const NoButton = Button.extend`
  color: red;
`;

const ExitButton = Button.extend`
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  height: 6rem;
  width: 6rem;
  border: none;
`;

const Overlay = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
`;

const OverlayChild = styled.div`
  margin-bottom: 2rem;

  ${props => props.small && css`
    font-size: 2rem;

  `}
`

const Timer = styled.div`
  font-size: 2rem;
  text-align: center;
  padding: 1.8rem;
`;

const Score = styled.div`
  font-size: 5rem;
  text-align: center;
  margin: 3rem 0;
`;

class GameScreen extends Component {
  constructor(props) {
    super(props);
    const [color, word] = getRandomColorPair();
    this.state = {
      secondsLeft: 60,
      color: color,
      word: word,
      score: 0,
      gameEnd: false,
      gameEndMessage: ''
    };
    this.tick = this.tick.bind(this);
    this.endGame = this.endGame.bind(this);
    this.nextColorWord = this.nextColorWord.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
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
    this.setState({
      gameEnd: true,
      gameEndMessage: reason
    });
    window.localStorage['last-score'] = this.state.score;
    window.localStorage['best-score'] = Math.max(
      window.localStorage['best-score'],
      this.state.score
    );
    window.clearInterval(this.timer);
  }

  nextColorWord() {
    const [color, word] = getRandomColorPair(this.state.color, this.state.word);
    this.setState({
      color,
      word
    });
  }
  
  /**
  * Returns ideal result rounded to 2 decimals
  */
  getAverage() {
    const result = Math.round(Math.round( (this.state.score) / (60 - this.state.secondsLeft) * 100 ) / 100 * 60);
    return !isFinite(result) || isNaN(result) ? 0 : result;
  }

  handleYes() {
    const { color, word, score } = this.state;
    if (score === 0) {
      this.timer = window.setInterval(this.tick, 1000);
    }
    
    if (color === word) {
      this.setState({
        score: score + 1
      });
      this.nextColorWord();
    } else {
      this.endGame('oops, wrong!');
    }
  }

  handleNo() {
    const { color, word, score } = this.state;
    if (score === 0) {
      this.timer = window.setInterval(this.tick, 1000);
    }
    
    if (color !== word) {
      this.setState({
        score: score + 1
      });
      this.nextColorWord();
    } else {
      this.endGame('oops, wrong!');
    }
  }

  render() {
    const { goToMenuScreen } = this.props;
    const {
      secondsLeft,
      score,
      color,
      word,
      gameEnd,
      gameEndMessage
    } = this.state;
    return (
      <div>
        <Timer>{secondsLeft}</Timer>
        <Score>{score}</Score>
        <ColorWord color={color} word={word} />
        <ButtonPanel>
          <NoButton onClick={this.handleNo}>NO</NoButton>
          <YesButton onClick={this.handleYes}>YES</YesButton>
        </ButtonPanel>
        <ExitButton onClick={goToMenuScreen}>X</ExitButton>
        {gameEnd && 
          <Overlay onClick={this.props.goToMenuScreen}>
            <OverlayChild>{gameEndMessage}</OverlayChild>
            <OverlayChild small>{"Seconds left: " + this.state.secondsLeft}</OverlayChild>
            <OverlayChild small>{"Expected score: " + this.getAverage()}</OverlayChild>
          </Overlay>
        }
      </div>
    );
  }
}

export default GameScreen;
