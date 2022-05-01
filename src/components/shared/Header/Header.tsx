import {
   Header,
   HeaderBodys,
   HeaderConnect,
   HeaderBalance
} from './Header.styled'

import { useMoralis } from "react-moralis";
import {useAppDispatch} from '../../../store/hooks';
import {setUser} from '../../../store/sliced/user/user.sliced'
import { useEffect } from "react";

export const HeaderComp = () => {
   const dispatch = useAppDispatch();
   const {authenticate, logout, account} = useMoralis();

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
            <HeaderBalance>0 ETH</HeaderBalance>
            <HeaderConnect onClick={connectWallet}>{account ? 'Disconnect' : 'Authenticate'}</HeaderConnect>
         </HeaderBodys>
      </Header>
   )
} 