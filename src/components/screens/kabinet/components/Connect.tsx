import { 
   BodyAccount,
   Title,
   ChangeEvent,
} from "../Kabinet.styled"

import { useMoralis } from "react-moralis";
import {useAppDispatch} from '../../../../store/hooks';
import {setUser} from '../../../../store/user/user.sliced'
import { useEffect } from "react";

export const ConnectComp = () => {
   const dispatch = useAppDispatch();
   const {authenticate, account} = useMoralis();

   useEffect(() => {
      if(account !== null) {
         dispatch(setUser(account));
      }
   }, [dispatch, account])

   const connectWallet = async () => {
      await authenticate();
   }

   return(
      <BodyAccount>
         {!account ?
            <>
               <Title>Connect wallet</Title>

               <ChangeEvent onClick={connectWallet}>Metamask</ChangeEvent>
               <ChangeEvent>Coin Base</ChangeEvent>
               <ChangeEvent>WalletConnect</ChangeEvent>
            </>
            :
            <Title>You are connected</Title>
         }
      </BodyAccount>
   );
}
