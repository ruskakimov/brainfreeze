import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { readableColor } from 'polished';
import getRandomColorPair from '../../helpers/randomColor';
import { addArrowListeners, addEnterListener } from '../../helpers/eventListeners';

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

const OverlayButton = styled.button`
  border: none;
  background-color: green;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  /* color of button will be the same as the color of the last word */
  background-color: ${({ color }) => color};
  /* make text color readable */
  color: ${({ color }) => readableColor(color)};
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
    this.handleNoClick = this.handleNoClick.bind(this);
    this.handleYesClick = this.handleYesClick.bind(this);
    this.removeArrowListeners = null;
    this.removeEnterListener = null;
  }

  componentDidMount() {
    this.removeArrowListeners = addArrowListeners(this.handleNoClick, this.handleYesClick);
    this.removeEnterListener = addEnterListener(this.props.goToMenuScreen)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
    if (this.removeEventListener !== null) {
      this.removeArrowListeners();
    }

    if (this.removeEnterListener !== null) {
      this.removeEnterListener();
    }
    
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

  handleYesClick() {
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

  handleNoClick() {
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
          <NoButton onClick={this.handleNoClick}>NO</NoButton>
          <YesButton onClick={this.handleYesClick}>YES</YesButton>
        </ButtonPanel>
        <ExitButton onClick={goToMenuScreen}>X</ExitButton>
        {gameEnd && 
          <Overlay>
            <OverlayChild>{gameEndMessage}</OverlayChild>
            <OverlayChild small>{"Seconds left: " + this.state.secondsLeft}</OverlayChild>
            <OverlayChild small>{"Your score: " + this.state.score}</OverlayChild>
            <OverlayChild small>{"Expected score: " + this.getAverage()}</OverlayChild>
            <OverlayButton color={this.state.color} onClick={this.props.goToMenuScreen}> Go to Main </OverlayButton>
          </Overlay>
        }
      </div>
    );
  }
}

export default GameScreen;
