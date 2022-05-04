import { 
   useMoralis,
   useWeb3ExecuteFunction,
} from "react-moralis";
import { useEffect, useState } from "react";

import {address} from '../../shared/variable'
import abi from '../../shared/lib/abi.json'

export const useCheckBalance = () => {
   const [balance, setBalance] = useState<number>(0);
   const {Moralis, account} = useMoralis()
   const { fetch } = useWeb3ExecuteFunction();

   useEffect(() => {
      const getBalance = async () => {
         if(account) {
            const options = {
               contractAddress: address,
               functionName: "payments",
               abi: abi,
               params: {
                  dest:account
               }
            }
   
            const balance = await fetch({
               params: options,
               onSuccess: (res: any) => {
                  setBalance(Number(Moralis.Units.FromWei(res)))
               }, 
   
               onError: (err:any) => {
                  console.log(err)
               }
            })
   
            return balance;
         }
      }

      getBalance()
   }, [Moralis.Units, account, account])

   return balance;
}