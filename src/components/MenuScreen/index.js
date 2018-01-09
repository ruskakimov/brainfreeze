import React, { Component } from 'react';

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    if (window.localStorage['last-score'] === undefined) {
      window.localStorage['last-score'] = '-';
    }
    if (window.localStorage['best-score'] === undefined) {
      window.localStorage['best-score'] = 0;
    }
  }

  render() {
    const goToGameScreen = this.props.goToGameScreen;
    return (
      <div>
        <p>{window.localStorage['last-score']}</p>
        <p>{window.localStorage['best-score']}</p>
        <button onClick={goToGameScreen}>game</button>
      </div>
    );
  }
}

export default MenuScreen;
