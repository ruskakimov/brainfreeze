import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  width: 10rem;
  height: 10rem;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: -1px;
  border: 0.5rem solid currentColor;
  text-transform: uppercase;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }
`;

export default Button;
