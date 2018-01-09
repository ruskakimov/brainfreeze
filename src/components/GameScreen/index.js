import React, { Component } from 'react';

import getRandomColorPair from '../../helpers/randomColor';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    const [color, word] = getRandomColorPair();
    this.state = {
      secondsLeft: 60,
      color: color,
      word: word
    };
    this.tick = this.tick.bind(this);
    this.endGame = this.endGame.bind(this);
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
    window.clearInterval(this.timer);
    console.log(reason);
    window.setTimeout(this.props.goToMenuScreen, 2000);
  }

  render() {
    const { goToMenuScreen } = this.props;
    return (
      <div>
        {this.state.secondsLeft}
        game screen <button onClick={goToMenuScreen}>menu</button>
      </div>
    );
  }
}

export default GameScreen;
