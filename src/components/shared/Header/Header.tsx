import {
   Header,
   HeaderBodys,
   HeaderConnect,
   HeaderBalance,
   HeaderСonclusion
} from './Header.styled'
import {useAppDispatch} from '../../../store/hooks';
import {setUser} from '../../../store/sliced/user/user.sliced'
import { useEffect } from "react";
import { 
   useMoralis,
} from "react-moralis";
import {useCheckBalance} from '../../../hooks/withdrawal/checkBalance'
import {useWithdrawPayments} from '../../../hooks/withdrawal/withdrawPayments'

export const HeaderComp = () => {
   const dispatch = useAppDispatch();
   const {authenticate, account, logout} = useMoralis();
   const balance = useCheckBalance()
   const payments = useWithdrawPayments()

   useEffect(() => {
      if(account !== null) {
         dispatch(setUser(account));
      }
   }, [dispatch, account])

   const connectWallet = async () => {
      account ? 
      await logout() :
      await authenticate();
   }

   return(
      <Header>
         <HeaderBodys></HeaderBodys>
         <HeaderBodys>
            {account && 
               <>
                  <HeaderBalance>{balance} ETH</HeaderBalance>
                  <HeaderСonclusion onClick={payments} >Withdrawal of money</HeaderСonclusion>
               </>
            }
            
            <HeaderConnect onClick={connectWallet}>{account ? 'Disconnect' : 'Authenticate'}</HeaderConnect>
         </HeaderBodys>
      </Header>
   )
} 