import { 
   useWeb3ExecuteFunction,
   useMoralis,
   useChain
} from "react-moralis";

import {address} from '../shared/variable'
import abi from '../shared/lib/abi.json'
import { useAppDispatch } from "../store/hooks"
import { setError } from "../store/sliced/error/error.sliced"

export const useSafeMint = () => {
   const dispatch = useAppDispatch();
   const { fetch } = useWeb3ExecuteFunction()
   const {Moralis, authenticate, account, chainId} = useMoralis()
   const {switchNetwork} = useChain()

   const mint = async (questions:any, meta:string, setStatus: React.Dispatch<React.SetStateAction<string>>) => {
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
                  tryValue: questions.attempt_price
               },

               msgValue: Moralis.Units.ETH(questions.prize),
            }
      
            const isMint = await fetch({
               params: options,

               onError: (error:any) => {
                  console.log(error);
                  switch(error.code) {
                     default:
                        dispatch(setError("There is not enough ETH in your account"));
                  }

                  setStatus('Image generation The picture has been generated!')
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