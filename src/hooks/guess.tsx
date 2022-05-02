import { 
   useWeb3ExecuteFunction,
   useMoralis,
} from "react-moralis";

import {address} from '../shared/variable'
import abi from '../shared/lib/abi.json'
import { useAppDispatch } from "../store/hooks"
import { setSuccess } from "../store/sliced/success/success.slice"
import { setError } from "../store/sliced/error/error.sliced"

export const  useGuess = () => {
   const dispatch = useAppDispatch();
   const { fetch } = useWeb3ExecuteFunction()
   const { Moralis} = useMoralis()

   const guess = async (tokenId:string, msgValue:number, prize:number, word:string) => {
      console.log(msgValue);

      const options = {
         contractAddress: address,
         functionName: "guess",
         abi: abi,
         params: {
            tokenId:Number(tokenId),
            word:word
         },
         msgValue: msgValue,
      }
      
      await fetch({
         params: options,
         onSuccess: (tx:any) => tx.wait().then((newTx:any) => {
            async function isGuessed() {
               const Question = Moralis.Object.extend("questions");
               const query = new Moralis.Query(Question);
               const obj = await query
               .equalTo("ID", tokenId)
               .find()

               console.log(obj)
               const result:boolean = obj[0].attributes.result;
                  
               if(result) {
                  dispatch(setSuccess(`You won: ${prize} ETH!`))
                  obj[0].set('guessed', true)
                  obj[0].save();

                  const user = Moralis.User.current();
      
                  if(user) {
                     console.log(user)
                     user.set('balance',  prize + Number(user.attributes.balance))
                     user.save()
                  }
               } else {
                  dispatch(setError("You didn't guess"))
               }
            }

            isGuessed()
         }),
         onError: (error:any) => {
            console.log(error.message);
            dispatch(setError("You didn't guess"))
         },
      })

      const incrementAttempt = async () => {
         const Question = Moralis.Object.extend("questions");
         const query = new Moralis.Query(Question);
         const obj = await query
         .equalTo("ID", tokenId)
         .find()
      
         obj[0].increment("attempt");
         obj[0].save();
      }

      incrementAttempt()
   }

   return guess
}