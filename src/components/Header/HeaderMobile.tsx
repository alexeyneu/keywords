import * as React from 'react';
import styled from "styled-components";
import {Container} from "../Container/Container";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

interface Props {
    style?: React.ReactNode | null
}

export const HeaderMobile:React.FC<Props> = (style) => {

    const TITLE_HEADER: string | null = 'Keywords.games'

    const TitleHeader = styled.p`
        font-size: 3.2rem;
        font-weight: 600;
    `

    const Header = styled.header`
      padding: 3rem 0;
      background-color: #fff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.44);
      position: relative;
      z-index: 21;
    `

    const DivFlex = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
      
      @media(max-width: 353px){
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `

    const ContentSideBar = styled.div`
      width: 100%;
      height: 200vh;
      background-color: #fff;
      position: fixed;
      top: 2.1%;
      left: 0;
      z-index: 20;
      overflow: scroll;
      padding: 5rem 4rem;

      p {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.7);
        margin: 0 0 2rem 0;
      }
      
      button{
        background: none;
        border: none;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.7);
        padding: 0;
        margin: 0;
      }
    `
    const ConnectButton = styled.button`
        background-color: #7857F9 !important;
        width: 80%;
        position: absolute;
        height: 6rem;
        left: 10%;
        bottom: -65vh;
        color: #fff !important;
        font-size: 2.4rem !important;
    `

    const IconNav = styled.div`
      width: 45px;
      height: 30px;
      cursor: pointer;
      display: block;
      
      span{
        background-color: #000;
        display: inherit;
        height: 3px;
        
        &:nth-child(2){
          margin: 10px 0;
        }
      }
    `

    const [isActiveSideBar, setIsActiveSideBar] = useState(false);

    const bodyEl: React.ReactNode | null = document.querySelector('body');

    if(isActiveSideBar) bodyEl.style.overflow = 'hidden';

    return(
        <>
        <Header>
            <Container>
                <DivFlex>
                    <TitleHeader>{TITLE_HEADER}</TitleHeader>
                    <IconNav onClick={() => setIsActiveSideBar(!isActiveSideBar)}>
                        {isActiveSideBar ?
                            <p
                                style={{
                                    fontSize: "3.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    marginTop: '-1rem'
                                }}>
                                &#10006;
                            </p>
                            :
                            <>
                                <span></span>
                                <span></span>
                                <span></span>
                            </>
                        }
                    </IconNav>
                </DivFlex>
            </Container>
        </Header>
            {isActiveSideBar ?
                    <ContentSideBar>
                        <motion.div
                            initial={{opacity: "0", y: "-1500px"}}
                            animate={{opacity: "1", y: '0'}}
                            exit={{opacity: "0", y: "-1500px"}}
                            transition={{type: 'spring', duraction: 1.5, bounce: 0.3}}
                        >
                        <Container>
                            <p>Balance: 0,001 ETH</p>
                            <p><button>Create keyword</button></p>
                            <button>Withdraw Money</button>
                        </Container>
                        <ConnectButton>Connect Wallet</ConnectButton>
                        </motion.div>
                    </ContentSideBar>
             : '' }
    </>
    )
}
