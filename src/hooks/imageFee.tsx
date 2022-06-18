import {
   useMoralis,
} from "react-moralis";

import {addressCreator} from '../shared/variable'
import { useWeb3Transfer } from "react-moralis"

export const useImageFee = () => {
   const {Moralis} = useMoralis()
   const { fetch } = useWeb3Transfer({
      type: "native",
      amount: Moralis.Units.ETH(0.01),
      receiver: addressCreator,
   });

   const imageFee = async () => {
      const payble = await fetch({
         onSuccess: (results:any) => {
            console.log(results);
         },
         onError: (err) => {
            console.log(err);
         }
      })

      
      return typeof payble !== 'undefined' ? true : false;
   }

   return imageFee
}