import * as React from 'react';
import styled from "styled-components";
import {Container} from "../Container/Container";
// import {motion} from "framer-motion";
import {WalletModal } from 'web3uikit'
import {useState, useEffect} from "react";
import {useCheckBalance} from '../../hooks/withdrawal/checkBalance'
import {useWithdrawPayments} from '../../hooks/withdrawal/withdrawPayments'
import {useMoralis} from "react-moralis";
import { Link } from "react-router-dom";
import {ModalsBackground} from '../../modals/modals-background'
import { WalletMessageModal } from "../../modals/WalletMessageModal/WalletMessageModal";
import { ChangeNetWork } from "../../modals/ChangeNetWork/ChangeNetWork";

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
      height: 100vh;
      background-color: #fff;
      position: fixed;
      top: 1.5%;
      left: 0;
      z-index: 20;
      overflow: scroll;
      padding: 10rem 4rem;

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
        bottom: 0;
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
    const [isModal, setIsModal] = useState(false);
    const [status, setStatus] = useState<string | number>('')

    const [isPayments, setIsPayments] = useState<boolean>(false)
    const {isAuthenticated, isWeb3Enabled, authenticate, logout, account, chainId} = useMoralis();
    const balance = useCheckBalance()
    const payments = useWithdrawPayments()
    const setModal = () => {
      if(isWeb3Enabled) {
        logout()
        return;
      }
      setIsModal(!isModal)
    }

    useEffect(() => {
      if(isPayments) {
        payments()
        setIsPayments(false)
      }
   }, [isPayments, payments])

    const bodyEl: HTMLBodyElement | null | any = document.querySelector('body');

    isActiveSideBar ? bodyEl.style.overflow = 'hidden' : bodyEl.style.overflow = 'scroll'

    return(
        <>
        <WalletModal
          isOpened={isModal}
          setIsOpened={setModal}
          chainId={4} // rinkeby
          moralisAuth
          signingMessage=""
        />
        {status === 'change network' &&
          <ModalsBackground onClick={() => setStatus('')}>
            <ChangeNetWork setStatus={setStatus} />
          </ModalsBackground>
        }

        {status === 'connect wallet' &&
          <ModalsBackground onClick={() => setStatus(' ')}>
              <WalletMessageModal setStatus={setStatus} />
          </ModalsBackground>
        }

        <Header>
            <Container>
                <DivFlex>
                  <Link to='/'>
                    <TitleHeader>{TITLE_HEADER}</TitleHeader>
                  </Link>

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
                        {/* <motion.div
                            initial={{opacity: "0", y: "-1500px"}}
                            animate={{opacity: "1", y: '0'}}
                            exit={{opacity: "0", y: "-1500px"}}
                        > */}
                        <Container>
                            <p>Balance: {balance} ETH</p>
                            <div>
                            {isWeb3Enabled ?
                              
                                  <p><Link to='/create-question-card'><button>Create keyword</button></Link></p>
                              :
                              <button onClick={() => {
                                if(!isWeb3Enabled) {
                                  setStatus('connect wallet')
                                  return
                                }

                                if(chainId !== '0x4') { // rinkeby
                                  setStatus('change network')
                                  return;
                                }
                              }}>Create keyword</button>

                            }
                            </div>

                            <button onClick={async () => {
                              if(!isWeb3Enabled) {
                                setStatus('connect wallet')
                                return
                              }

                              if(chainId !== '0x4') { // rinkeby
                                setStatus('change network')
                                return;
                              }

                              if(!isWeb3Enabled || !isAuthenticated) {
                                await authenticate()
                              }

                              setIsPayments(true)
                            }}>
                              Withdraw Money
                            </button>
                        </Container>
                        <ConnectButton onClick={setModal}>
                          {account ?
                            account.toString().replace(/.+/, (e: any) => e.slice(0,6)+'...'+e.slice(-6))
                            :
                            'Connect Wallet'
                          }
                        </ConnectButton>
                        {/* </motion.div> */}
                    </ContentSideBar>
            : '' }
    </>
    )
}
