import * as React from 'react';
import styled from "styled-components";

interface Props{
    placeholder: string
    style?: React.ReactNode | any
    onChange?: React.ChangeEvent<HTMLInputElement> | any
}

const InputLayout = styled.input`
    width: 100%;
    height: 7rem;
    background: #ECECEC;
    box-shadow: inset 0.3rem 0.3rem 1.2rem rgba(0, 0, 0, 0.12), inset -0.3rem -0.3rem 1.2rem #FFFFFF;
    border-radius: 0.8rem;
    border: none;
    padding: 0 2.4rem;
    font-size: 18px;
    font-weight: 600;
  
      ::placeholder{
        font-size: 18px;
      }
`

export const Input:React.FC<Props> = ({placeholder, style, onChange}) => {
    return <InputLayout style={style} type="text" placeholder={placeholder} onChange={onChange}/>
}
