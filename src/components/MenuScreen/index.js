import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import { addEnterListener } from "../../helpers/eventListeners";

const witty_messages = [
  'Does it match?',
  'This game cures cancer',
  'No refunds',
  'Score 99 to uncover the krabby patty secret formula',
  'I believe in you!',
  'You can do it!',
  'JUST DO IT Ⓒ',
  'Why bother?',
  'I like BORJOMI',
  'Score -1 to uncover the secret to life',
  'Is it fun?',
  'Why are you still here?',
  'You are running away from your responsibilities',
  'I like you',
  'You rock!',
  "Don't play this game",
  'This game has ruined lives of 0 people',
  'Ayy lmao',
  '... --- ...',
  "99.9999% of people don't play this game",
  'On your way to nirvana',
  'There are better things to do',
  'Dancing bears!',
  'I like trains',
  '😁😁😁',
  'To infinity and beyond!!!',
  'Far away in a distant galaxy...',
  'Come at me bro',
  'Hello its me ur brother',
  'Kappa'
];

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
  padding: 0 3rem;
  margin-bottom: 5rem;
`;

const Score = styled.div`
  margin: 3rem 0;
  float: left;
  width: 50%;
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
    if (window.localStorage['witty-message-id'] === undefined) {
      window.localStorage['witty-message-id'] = 0;
    }

    this.removeEnterListener = null;
  }

  componentDidMount() {
    const id = window.localStorage['witty-message-id'];
    console.log(id);
    window.localStorage['witty-message-id'] = (+id + 1) % witty_messages.length;
    this.removeEnterListener = addEnterListener(this.props.goToGameScreen);
  }
  
  componentWillUnmount() {
    if (this.removeEnterListener !== null) {
      this.removeEnterListener();
    }
  }
  

  render() {
    const goToGameScreen = this.props.goToGameScreen;
    return (
      <Wrapper>
        <Heading>BrainFreeze</Heading>
        <Subheading>
          {witty_messages[window.localStorage['witty-message-id']]}
        </Subheading>
        <div>
          <Score>
            best score:
            <Number>{window.localStorage['best-score']}</Number>
          </Score>
          <Score>
            last score:
            <Number>{window.localStorage['last-score']}</Number>
          </Score>
        </div>
        <PlayButton onClick={goToGameScreen}>play</PlayButton>
      </Wrapper>
    );
  }
}

export default MenuScreen;
