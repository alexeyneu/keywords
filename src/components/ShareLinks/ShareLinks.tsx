import * as React from 'react';
import styled from "styled-components";

const LinkContainer = styled.div`
    min-width: 8.8rem;
    width: 100%;
    min-height: 6.8rem;
    height: auto;
    background: #FFFFFF;
    border: 2px solid #F5F5F5;
    border-radius: 12px 0px 12px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem;
  
  a:not(:last-child){
    margin-right: 35px;
  }
`

export const ShareLinks = () => {
    return(
        <LinkContainer>
            <a href="#">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 2.9998C22.0424 3.67528 20.9821 4.19191 19.86 4.5298C19.2577 3.83731 18.4573 3.34649 17.567 3.12373C16.6767 2.90096 15.7395 2.957 14.8821 3.28426C14.0247 3.61151 13.2884 4.1942 12.773 4.95352C12.2575 5.71283 11.9877 6.61214 12 7.5298V8.5298C10.2426 8.57537 8.50127 8.18561 6.93101 7.39525C5.36074 6.60488 4.01032 5.43844 3 3.9998C3 3.9998 -1 12.9998 8 16.9998C5.94053 18.3978 3.48716 19.0987 1 18.9998C10 23.9998 21 18.9998 21 7.4998C20.9991 7.22126 20.9723 6.9434 20.92 6.6698C21.9406 5.6633 22.6608 4.39251 23 2.9998Z" fill="#6A34FF"/>
                </svg>
            </a>
            <a href="#">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="#6A34FF"/>
                </svg>
            </a>
        </LinkContainer>
    )
}
