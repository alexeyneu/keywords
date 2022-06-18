import { 
   useWeb3ExecuteFunction,
   useMoralis,
} from "react-moralis";

import {address} from '../../shared/variable'
import abi from '../../shared/lib/abi.json'

export const useWithdrawPayments = () => {
   const { fetch } = useWeb3ExecuteFunction();
   const {
      user, 
      account
   } = useMoralis();

   const payments = async ()=> {
      console.log(account)
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
               
            if(user) {
               user.set("balance", '0')
            }
         }, 
   
         onError: (err: any) => {
            console.log(err)
         }
      })
   }

   return payments
}