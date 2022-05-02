import { 
   useWeb3ExecuteFunction,
   useMoralis,
} from "react-moralis";
import {useCallback } from "react";

import {address} from '../../shared/variable'
import abi from '../../shared/lib/abi.json'

export const useWithdrawPayments = () => {
   const { fetch } = useWeb3ExecuteFunction();
   const {Moralis, account} = useMoralis();

   const payments = useCallback(()=> {
      if(account) {
         const options = {
            contractAddress: address,
            functionName: "withdrawPayments",
            abi: abi,
            params: {
               payee:account
            }
         }
   
         fetch({
            params: options,
            onSuccess: (res: any) => {
               console.log(res)
               
               const user = Moralis.User.current()
               if(user) {
                  user.set("balance", '0')
               }
            }, 
   
            onError: (err: any) => {
               console.log(err)
            }
         })
      }
   }, [Moralis, account, fetch])

   return payments
}