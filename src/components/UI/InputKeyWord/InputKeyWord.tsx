import * as React from 'react';
import styled from "styled-components";

interface Props{
    value? : string,
    margin : string;
    disabled? : boolean;
    onChange?:(e:any, isWhitespace:boolean, countInp:number) => void;
    isWhitespace?: boolean;
    countInp?:number;
}

const InputKey = styled.input.attrs((props: {margin: string}) => props)`
  width: 4rem;
  height: 4rem;
  background: #dcdcdc;
  box-shadow: inset 0.2rem 0.2rem 0.6rem rgba(0, 0, 0, 0.1), inset -0.2rem -0.2rem 0.6rem rgba(255, 255, 255, 0.6);
  border-radius: 0.6rem;
  border: none;
  font-size: 2rem;
  padding: 0 1.2rem;
  text-transform: uppercase;
  margin: 0 0.2rem;

  margin-left:${props => props.margin};
`

export const InputKeyWord:React.FC<Props> = ({value, margin, disabled = true, onChange, isWhitespace = false, countInp = 0}) => {
    return(
        <InputKey
            margin={margin}
            type="text"
            maxLength={1}
            value={value}
            disabled={disabled}
            onChange={(e:any) => onChange !== undefined && onChange(e, isWhitespace, countInp)}
        />
    )
}
