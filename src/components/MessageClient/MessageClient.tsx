import * as React from 'react';
import styled from "styled-components";

interface Props{
    children: React.ReactNode | any
}

const ErrorMessage = styled.p`
    color: rgba(230, 53, 53, 1);
    font-size: 14px;
`
const SuccessMessage = styled.p`
  color: rgb(53, 230, 68);
  font-size: 14px;
`

const ErrorMessageClient: React.FC<Props> = ({children}) => {
    return <ErrorMessage>{children}</ErrorMessage>
}

const SuccessMessageClient: React.FC<Props> = ({children}) => {
    return <SuccessMessage>{children}</SuccessMessage>
}

export { ErrorMessageClient, SuccessMessageClient };
