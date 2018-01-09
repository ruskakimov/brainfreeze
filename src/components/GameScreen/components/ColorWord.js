import React from 'react';

import styled from 'styled-components';

const Colored = styled.div`
  font-size: 7rem;
  font-weight: bold;
  color: ${props => props.color};
`;

const ColorWord = ({ color, word }) => {
  return <Colored color={color}>{word}</Colored>;
};

export default ColorWord;
