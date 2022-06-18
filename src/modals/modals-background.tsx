import * as React from 'react';
import styled from "styled-components";

interface Props{
    children? : React.ReactNode | any,
    onClick: () => any;
}

const ModalBackground = styled.div`
  background: rgb(38, 38, 38);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
  z-index: 2;
`

const ModalContent = styled.div`
    max-width: 900px;
    padding: 200px 0;
    position: relative;
    margin: auto;
    text-align: center;
`

const CloseButtonModal = styled.button`
    border: none;
    background: none;
    position: absolute;
    top: 20%;
    right: 0;
    padding: 0 2rem 0 0;
`

export const ModalsBackground:React.FC<Props> = ({children, onClick}) => {

    return(
        <>
        <ModalBackground>
            <ModalContent>
                <CloseButtonModal onClick={onClick}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.19167 7.19191C7.63798 6.7456 8.3616 6.7456 8.80791 7.19191L15.9998 14.3829L23.1917 7.19191C23.6037 6.77993 24.2519 6.74824 24.7002 7.09684L24.8079 7.19191C25.2542 7.63823 25.2542 8.36184 24.8079 8.80816L17.6169 16L24.8079 23.1919C25.2199 23.6039 25.2516 24.2522 24.903 24.7005L24.8079 24.8082C24.3616 25.2545 23.638 25.2545 23.1917 24.8082L15.9998 17.6172L8.80791 24.8082C8.39593 25.2201 7.74767 25.2518 7.29933 24.9032L7.19167 24.8082C6.74536 24.3618 6.74536 23.6382 7.19167 23.1919L14.3826 16L7.19167 8.80816C6.77969 8.39618 6.748 7.74791 7.0966 7.29958L7.19167 7.19191Z" fill="white"/>
                    </svg>
                </CloseButtonModal>
                {children}
            </ModalContent>
        </ModalBackground>
        </>
    )
}
