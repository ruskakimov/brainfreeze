import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const PlayButton = Button.extend`
  color: green;
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Heading = styled.h1`
  font-size: 5rem;
  margin: 2rem 0 0.5rem;
  text-align: center;
`;

const Subheading = styled.h3`
  font-size: 1.5rem;
  text-align: center;
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
        <Heading>BrainFreeze</Heading>
        <Subheading>Does it match?</Subheading>
        <p>last: {window.localStorage['last-score']}</p>
        <p>best: {window.localStorage['best-score']}</p>
        <PlayButton onClick={goToGameScreen}>play</PlayButton>
      </div>
    );
  }
}

export default MenuScreen;
