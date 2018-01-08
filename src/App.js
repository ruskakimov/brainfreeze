import React, { Component } from 'react';

import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageId: 0
    };
  }

  goToScreen = pageId => () => {
    this.setState({
      currentPageId: pageId
    });
  };

  render() {
    const pages = [
      <MenuScreen goToGameScreen={this.goToScreen(1)} />,
      <GameScreen goToMenuScreen={this.goToScreen(0)} />
    ];
    const pageId = this.state.currentPageId;

    return <div className="App">{pages[pageId]}</div>;
  }
}

export default App;
