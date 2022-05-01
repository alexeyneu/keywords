import { 
   useWeb3ExecuteFunction,
   useMoralis,
} from "react-moralis";

import {address} from '../shared/variable'
import abi from '../shared/lib/abi.json'

export const useGuess = () => {
   const { fetch } = useWeb3ExecuteFunction()
   const {authenticate, account, chainId} = useMoralis()

   const guess = async (tokenId:string, msgValue:number, word:string) => {
      if(account) {
         if(chainId === '0x4') {
            console.log(msgValue)
            const options = {
               contractAddress: address,
               functionName: "guess",
               abi: abi,
               params: {
                  tokenId:tokenId,
                  word:word
               },
               msgValue: msgValue,
            }
      
            await fetch({
               params: options,
               onSuccess: (tx:any) => tx.wait().then((newTx:any) => {
                  console.log(newTx)
               }),
               onError: (error:any) => {
                  console.log(error.code)
                  // switch(error.message) {
                  //    case ""
                  // }
               },
            })  
         } else {
            console.log('поменяйте сеть')
         }
      } else {
         authenticate()
      }
   }

   return guess
}