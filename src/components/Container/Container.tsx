import * as React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
    max-width: 118rem;
    padding: 0 2rem;
    margin: 0 auto;
`

interface Props{
    children: React.ReactNode;
}

export const Container = ({children} : Props) => {
    return(
        <Wrapper>
            {children}
        </Wrapper>
    );
}
