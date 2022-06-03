import * as React from 'react';
import styled from "styled-components";


const CreateWordMessage = styled.div`
    max-width: 56.7rem;
    width: 100%;
    margin: auto;
  
    h3, p{
      color: #fff;
    }
  
  p{
    margin: 1.6rem 0 6rem 0;
  }
  svg{
    margin-bottom: 4.6rem;
  }
`

export const CreatedWordModal = () => {
    return(
        <CreateWordMessage>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.9987 4.14307C42.727 4.14307 53.8559 15.272 53.8559 29.0002C53.8559 42.7284 42.727 53.8574 28.9987 53.8574C15.2705 53.8574 4.1416 42.7284 4.1416 29.0002C4.1416 15.272 15.2705 4.14307 28.9987 4.14307ZM28.9987 8.28592C17.5586 8.28592 8.28446 17.56 8.28446 29.0002C8.28446 40.4404 17.5586 49.7145 28.9987 49.7145C40.4389 49.7145 49.713 40.4404 49.713 29.0002C49.713 17.56 40.4389 8.28592 28.9987 8.28592ZM37.8852 21.3152C38.6941 20.5063 40.0177 20.5063 40.8266 21.3152C41.6355 22.1242 41.6355 23.4477 40.8266 24.2566L26.3206 38.7506C25.5117 39.5596 24.2001 39.5596 23.3912 38.7506L16.1412 31.5006C15.3322 30.6917 15.3322 29.3801 16.1412 28.5712C16.9501 27.7623 18.2617 27.7623 19.0706 28.5712L24.8559 34.3565L37.8852 21.3152Z" fill="#289940"/>
            </svg>
            <h3>You have created a word!</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. </p>
        </CreateWordMessage>
    );
};
