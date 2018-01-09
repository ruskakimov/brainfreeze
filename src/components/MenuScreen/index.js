import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const PlayButton = Button.extend`
  color: green;
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 5rem;
  margin: 2rem 0 0.5rem;
`;

const Subheading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 5rem;
`;

const Score = styled.div`
  margin: 3rem 0;
`;

const Number = styled.p`
  font-size: 4rem;
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
      <Wrapper>
        <Heading>BrainFreeze</Heading>
        <Subheading>Does it match?</Subheading>
        <Score>
          last score:
          <Number>{window.localStorage['last-score']}</Number>
        </Score>
        <Score>
          best score:
          <Number>{window.localStorage['best-score']}</Number>
        </Score>
        <PlayButton onClick={goToGameScreen}>play</PlayButton>
      </Wrapper>
    );
  }
}

export default MenuScreen;
