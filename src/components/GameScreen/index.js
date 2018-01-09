import React, { Component } from 'react';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsLeft: 60
    };
    this.tick = this.tick.bind(this);
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
