import * as React from 'react';
import styled from "styled-components";

interface Props{
    children?: React.ReactNode
    onClick?: React.ReactNode | any
}

const CircleButton = styled.button`
    width: 5.2rem;
    height: 5.2rem;
    background: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  
  & picture,img,svg{
    width: 2.4rem;
    height: 1.9rem;
  }
`

export const CircleIconButton:React.FC<Props> = ({children, onClick, ...props}) => {
    return(
        <CircleButton onClick={onClick}>
            {children}
        </CircleButton>
    )
}
