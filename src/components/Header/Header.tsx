import styled from "styled-components";
import {Container} from "../Container/Container";
import {ActionButton, WidthDrawlButton} from "../UI/Buttons/Buttons";
import {CircleIconButton} from "../UI/CircleIconButton/CircleIconButton";
import BG_LIGHT from '../../images/light-bg.png';
import GroupsCube from '../../images/group-cubes.png';
import walletIcon from '../../images/wallet-icon.png';
import {WalletModal } from 'web3uikit'
import {useState, useEffect} from "react";
import {useCheckBalance} from '../../hooks/withdrawal/checkBalance'
import {useWithdrawPayments} from '../../hooks/withdrawal/withdrawPayments'
import {useMoralis} from "react-moralis";
import { Link } from "react-router-dom";
import {ModalsBackground} from '../../modals/modals-background'
import { WalletMessageModal } from "../../modals/WalletMessageModal/WalletMessageModal";
import { ChangeNetWork } from "../../modals/ChangeNetWork/ChangeNetWork";

export const Header = () => {

    const TITLE_HEADER: string | null = 'Keywords.games'

    const TitleHeader = styled.p`
        font-size: 3.2rem;
        font-weight: 600;
    `

    const DivFlex = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
      
        position: relative;
        z-index: 2;
      
        @media (max-width: 972px){
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
    `;

    const Header = styled.header`
        padding: 4.2rem 0;
        position: relative;
      
      @media(max-width: 560px){
        padding: 2.2rem 0 1rem 0;
      }
    `;

    const BgLightStatic = styled.img`
      position: absolute;
      z-index: 1;
      right: 0;
      top: 0;
      width: 52.7rem;
      height: 52.7rem;
    `

    const DetailAccount = styled.div`
      display: flex;
      align-items: center;

      @media (max-width: 972px){
        margin: 2rem 0;
      }
      
      @media (max-width: 630px){
        flex-direction: column;
        align-items: center;
      }
      
      & button:not(:last-child){
        margin: 0 2.4rem 0 0;

        @media (max-width: 630px){
          margin: 2.4rem 0 1.4rem 0;;
        }
      }

      & p {
        font-size: 2.4rem;
        font-weight: 600;
        margin: 0 2.4rem;
        text-align: center;

        & span {
          color: rgba(0, 0, 0, 0.4);
        }
      }
    `;

    const [isModal, setIsModal] = useState(false);
    const [isPayments, setIsPayments] = useState<boolean>(false)
    const {isAuthenticated, isWeb3Enabled, authenticate, logout, account, chainId} = useMoralis();
    const [status, setStatus] = useState<string | number>('')

    const setModal = () => {
      if(isWeb3Enabled) {
        logout()
        return;
      }
      setIsModal(!isModal)
    }
    const balance = useCheckBalance()
    const payments = useWithdrawPayments()

    useEffect(() => {
      if(isPayments) {
        payments()
        setIsPayments(false)
      }
   }, [isPayments, payments])

    return(
      <>
        <WalletModal
          isOpened={isModal}
          setIsOpened={setModal}
          chainId={4}
          moralisAuth
          signingMessage=""
        />
        {/* rinkeby */}
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
            <BgLightStatic src={BG_LIGHT} alt={'bg-light'}/>
            <img
                style={{position: "absolute", left: "9%", top: "180%", width: "22.6rem"}}
                src={GroupsCube}
                alt={'group-cube'}
            />
            <Container>
                <DivFlex>
                    <Link to='/'>
                      <TitleHeader>{TITLE_HEADER}</TitleHeader>
                    </Link>
                    <DetailAccount>
                        <p>{balance} <span>ETH</span></p>

                        {isWeb3Enabled && chainId === '0x4' ?
                              <Link to='/create-question-card'>
                                <ActionButton>Keyword create</ActionButton>
                              </Link>
                              :
                              <ActionButton onClick={() => {
                                if(!isWeb3Enabled) {
                                  setStatus('connect wallet')
                                  return
                                }else window.open("/create-question-card");
                              }}>

                                  Create keyword</ActionButton>
                        }

                        <WidthDrawlButton onClick={async () => {
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
                          Widthdrawl of money
                        </WidthDrawlButton>
                        <WidthDrawlButton onClick={setModal}>
                            {account ?
                              account.toString().replace(/.+/, (e: any) => e.slice(0,6)+'...'+e.slice(-6))
                              :
                              'Authenticate'
                            }
                        </WidthDrawlButton>
                    </DetailAccount>
                </DivFlex>
            </Container>
        </Header>
      </>
    )
}
