import { 
   useWeb3ExecuteFunction,
   useChain,
   useMoralis,
} from "react-moralis";

import {address} from '../shared/variable'
import abi from '../shared/lib/abi.json'

export const useSafeMint = () => {
   const { switchNetwork } = useChain();
   const { fetch } = useWeb3ExecuteFunction()

   // const settings = {
   //    contractAddress: address,
   //    functionName: "safeMint",
   //    abi: abi,
   //    params: {
   //       wordHash:questions.word,
   //       uri:JSON.stringify(meta),
   //       tryValue:questions.attempt_price
   //    },
   //    msgValue: Moralis.Units.ETH(0.01),
   // }
}