import * as React from 'react';
import styled from "styled-components";

interface Props{
    onClick?: React.ReactNode | any;
    props?: React.ReactNode;
    children?: React.ReactNode
}

const EventButton = styled.button`
  background: rgba(106, 52, 255, 1);
  border: 0.01rem solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 16px 0px rgba(186, 161, 255, 1) inset;
  border-radius: 4.6rem;
  font-size: 16px;
  color: #fff;
  width: 21.4rem;
  min-height: 5.2rem;
  font-weight: 600;
`;

const DisconnectButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 4.6rem;
  font-size: 1.6rem;
  color: #000000;
  width: 21.4rem;
  min-height: 5.2rem;
  font-weight: normal;
`;

const WidthButton = styled.button`
  background: rgba(106, 52, 255, 0.2);
  border: 0.01rem solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 1.6rem 0px rgba(186, 161, 255, 1) inset;
  border-radius: 4.6rem;
  font-size: 1.6rem;
  width: 21.4rem;
  min-height: 5.2rem;
  color: #000000;
  font-weight: 600;
  
`;

const GuessButton = styled.button`
  background: rgba(106, 52, 255, 1);
  border: 0.01rem solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 16px 0px rgba(186, 161, 255, 1) inset;
  border-radius: 4.6rem;
  font-size: 16px;
  color: #fff;
  width: 15.2rem;
  min-height: 5.2rem;
  font-weight: normal;
`

const ActionButton: React.FC<Props> =
    ({children, onClick}) => {
    return<EventButton onClick={onClick}>{children}</EventButton>
}


const WidthDrawlButton: React.FC<Props> =
    ({children, onClick}) => {
    return<WidthButton onClick={onClick}>{children}</WidthButton>
}

const Guess: React.FC<Props> =
    ({children, onClick, props}) => {
    return<GuessButton onClick={onClick}>{children}</GuessButton>
}

const Disconnect: React.FC<Props> =
    ({children, onClick}) => {
    return<DisconnectButton onClick={onClick}> {children} </DisconnectButton>
}

export {ActionButton, WidthDrawlButton, Guess, Disconnect};
