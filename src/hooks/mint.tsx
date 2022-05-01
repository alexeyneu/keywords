import { 
   useWeb3ExecuteFunction,
   useMoralis,
   useChain
} from "react-moralis";

import {address} from '../shared/variable'
import abi from '../shared/lib/abi.json'
import { useAppDispatch } from "../store/hooks"
import { setError } from "../store/sliced/error/error.sliced"
import { setSuccess } from "../store/sliced/success/success.slice"

export const useSafeMint = () => {
   const dispatch = useAppDispatch();
   const { fetch } = useWeb3ExecuteFunction()
   const {Moralis, authenticate, account, chainId} = useMoralis()
   const {switchNetwork} = useChain()

   const mint = async (questions:any, meta:string) => {
      if(account) {
         if(chainId === '0x4') {
            const ethers = Moralis.web3Library;
            
            const options = {
               contractAddress: address,
               functionName: "safeMint",
               abi: abi,
               params: {
                  wordHash:ethers.utils.id(questions.word),
                  uri:JSON.stringify(meta),
                  tryValue: String(questions.attempt_price)
               },

               msgValue: Moralis.Units.ETH(questions.prize),
            }
      
            const isMint = await fetch({
               params: options,
               onSuccess: (tx:any) => tx.wait().then((newTx:any) => {
                  dispatch(setSuccess("You have created a word!"));
               }),

               onError: (error:any) => {
                  console.log(error);
                  switch(error.code) {
                     case "UNPREDICTABLE_GAS_LIMIT":
                        dispatch(setError("there is not enough Ethereum for gas"));
                  }
               },
            })  

            return isMint
         } else {
            dispatch(setError("Change the network to rinkeby"));
            switchNetwork("0x4")
         }
      } else {
         dispatch(setError("Log in"));
         authenticate()
      }
   }

   return mint
}