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

   const guess = async (tokenId:string, msgValue:number, prize:number, word:string, setStatus: React.Dispatch<React.SetStateAction<string>> ) => {

      const options = {
         contractAddress: address,
         functionName: "guess",
         abi: abi,
         params: {
            tokenId:String(Number(tokenId) - 1),
            word:word
         },
         msgValue: msgValue,
      }
      
      await fetch({
         params: options,
         onSuccess: (tx:any) => tx.wait().then((newTx:any) => {
            async function isGuessed() {
               const Guessed = Moralis.Object.extend("guessed");
               const query = new Moralis.Query(Guessed);
               const obj = await query
               .equalTo("tokenId", String(Number(tokenId) - 1))
               .find()

               console.log(obj)
               let result = await obj[obj.length - 1].attributes.result;


               if(result) {
                  dispatch(setSuccess(`You won: ${prize} ETH!`));
                  
                  const Question = Moralis.Object.extend("questions");
                  const query = new Moralis.Query(Question);
                  const question = await query
                  .equalTo("ID", String(tokenId))
                  .find()

                  if(typeof question[0].set === 'function') {
                     question[0].set('guessed', true)
                     question[0].save();
                     console.log(question[0])
                  }
               } else {
                  dispatch(setError("You didn't guess"))
               }

               setStatus("")
            }

            isGuessed()
         }),
         onError: (error:any) => {
            console.log(error.message);
            dispatch(setError("Try again"))
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

      await incrementAttempt()
   }

   return guess
}