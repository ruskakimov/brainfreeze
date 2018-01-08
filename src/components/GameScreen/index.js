import React from 'react';

const GameScreen = ({ goToMenuScreen }) => {
  return (
    <div>
      game screen <button onClick={goToMenuScreen}>menu</button>
    </div>
  );
};

export default GameScreen;
