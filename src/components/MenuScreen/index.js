import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const PlayButton = Button.extend`
  color: green;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
        <p>last: {window.localStorage['last-score']}</p>
        <p>best: {window.localStorage['best-score']}</p>
        <PlayButton onClick={goToGameScreen}>play</PlayButton>
      </div>
    );
  }
}

export default MenuScreen;
