import React, { Component } from 'react';
import styled from 'styled-components';

import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';

const Wrapper = styled.div`
  max-width: 60rem;
  margin: 0 auto;
`;

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

    return <Wrapper>{pages[pageId]}</Wrapper>;
  }
}

export default App;
