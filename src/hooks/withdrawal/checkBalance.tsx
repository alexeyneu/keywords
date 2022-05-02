import { 
   useMoralis,
} from "react-moralis";
import { useEffect, useState } from "react";

export const useCheckBalance = () => {
   const [balance, setBalance] = useState<number>(0);
   const {Moralis, isInitialized} = useMoralis();

   useEffect(() => {
      if(isInitialized) {
         const user = Moralis.User.current()
         user && setBalance(Number(user.attributes.balance))
      }
   }, [Moralis, isInitialized])

   return balance
}