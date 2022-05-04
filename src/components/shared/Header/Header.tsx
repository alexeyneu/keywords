import {
   Header,
   PaginationPanel,
   PaginationPages,
   WithdrawalBtn,
   BalanceText,
   Authenticate,
   Title,
} from './Header.styled'
import {useAppDispatch} from '../../../store/hooks';
import {setUser} from '../../../store/sliced/user/user.sliced'
import { useEffect, useState } from "react";
import {useMoralis} from "react-moralis";
import {useLocation} from "react-router";
import {useCheckBalance} from '../../../hooks/withdrawal/checkBalance'
import {useWithdrawPayments} from '../../../hooks/withdrawal/withdrawPayments'
import { ConnectModal } from '../modals/connectWallet/ConnectWallet';

export const HeaderComp = () => {
   const location = useLocation()
   const dispatch = useAppDispatch();
   const [isPayments, setIsPayments] = useState<boolean>(false)
   const [isModal, setModal] = useState<boolean>(false)
   const {isAuthenticated, isWeb3Enabled, authenticate, account, logout} = useMoralis();
   const balance = useCheckBalance()
   const payments = useWithdrawPayments()

   useEffect(() => {
      if(account !== null) {
         dispatch(setUser(account));
      }
   }, [dispatch, account])

   useEffect(() => {
      if(isPayments) {
         payments()
         setIsPayments(false)
      }
   }, [isPayments, payments])

   const connectWallet = async () => {
      !isAuthenticated ? 
      setModal(true)
      :
      logout()
   }

   return(
      <>
      {isModal && 
         <ConnectModal setModal={setModal} />
      }
      
      <Header>
         <Title to="/">MindBreaker.Games</Title>
         <PaginationPanel>
            <PaginationPages 
               to="/createQuestions"
               isPages={location.pathname === "/createQuestions"} 
            >Create question</PaginationPages>
            <WithdrawalBtn onClick={async () => {
                if(!isWeb3Enabled || !isAuthenticated) {
                  await authenticate()
                  setIsPayments(true)
               } else {
                  setIsPayments(true)
               }
            }}>Withdrawal of money</WithdrawalBtn>
            <BalanceText>{balance} ETH</BalanceText>
            <Authenticate onClick={connectWallet}>{isAuthenticated ? 'Disconnect' : 'Authenticate'}</Authenticate>
         </PaginationPanel>
      </Header>
      </>
   )
} 