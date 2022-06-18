import { 
   useWeb3ExecuteFunction,
   useMoralis,
} from "react-moralis";

import {address} from '../shared/variable'
import abi from '../shared/lib/abi.json'
import { useAppDispatch } from "../store/hooks"
import { setSuccess } from "../store/sliced/success/success.slice"
import { setError } from "../store/sliced/error/error.sliced"
import confetti  from 'canvas-confetti';
import { PayloadType } from 'web3uikit/dist/components/Notification/types';

export const  useGuess = () => {
   const dispatch = useAppDispatch();
   const { fetch } = useWeb3ExecuteFunction()
   const { Moralis} = useMoralis()

   const guess = async (tokenId:string, msgValue:number, prize:number, word:string, dispatchNotification: (props: PayloadType) => void ) => {
      const options = {
         contractAddress: address,
         functionName: "guess",
         abi: abi,
         params: {
            tokenId:String(Number(tokenId) - 1), //Number(tokenId) - 1
            word:word
         },
         msgValue: msgValue,
      }
      
      await fetch({
         params: options,
         onSuccess: (tx:any) => tx.wait().then((newTx:any) => {
            async function isGuessed() {
               console.log(newTx)
               const Guessed = Moralis.Object.extend("isGuessed");
               const query = new Moralis.Query(Guessed);
               const obj = await query
               .equalTo("tokenId", String(Number(tokenId) - 1)) 
               .find()//Number(tokenId) - 1) 

               console.log(obj)
               let result = await obj[obj.length - 1].attributes.result;

               console.log(obj[obj.length - 1])
               if(result) {
                  let duration = 8 * 1000;
                  let animationEnd = Date.now() + duration;
                  let skew = 1;

                  const randomInRange = (min:number, max:number) => {
                     return Math.random() * (max - min) + min;
                  }

                  (function frame() {
                     let timeLeft = animationEnd - Date.now();
                     let ticks = Math.max(200, 500 * (timeLeft / duration));
                     skew = Math.max(0.8, skew - 0.001);

                     let colors = ['#f3d633'];

                     confetti({
                        particleCount: 1,
                        startVelocity: 0,
                        ticks: ticks,
                        origin: {
                           x: Math.random(),
                           y: (Math.random() * skew) - 0.2
                        },
                        colors,
                        shapes: ['circle'],
                        gravity: randomInRange(0.4, 0.6),
                        scalar: randomInRange(0.4, 1),
                        drift: randomInRange(-0.4, 0.4)
                     });

                     if (timeLeft > 0) {
                        requestAnimationFrame(frame);
                     }
                  }());
                  
                  
                  dispatch(setSuccess(`You won: ${prize} ETH!`));
                  dispatchNotification({
                     type: 'success',
                     message: `You won: ${prize} ETH!`,
                     title: 'Success',
                     icon: "info",
                     position:'topR',
                  });

                  const Question = Moralis.Object.extend("questions");
                  const query = new Moralis.Query(Question);
                  const question = await query
                  .equalTo("ID", String(tokenId)) // tokenId
                  .find()

                  if(typeof question[0].set === 'function') {
                     question[0].set('guessed', true)
                     question[0].save();
                     console.log(question[0])
                  }
               } else {
                  dispatch(setError("You didn't guess"))
                  dispatchNotification({
                     type: 'error',
                     message: "You didn't guess",
                     title: 'Error',
                     icon: "info",
                     position:'topR',
                  });
               }
            }

            isGuessed()
         }),
         onError: (error:any) => {
            console.log(error.message);
            dispatch(setError("Try again"))
            dispatchNotification({
               type: 'info',
               message: "Try again",
               title: 'Info',
               icon: "info",
               position:'topR',
           });
         },
      })

      const incrementAttempt = async () => {
         const Question = Moralis.Object.extend("questions");
         const query = new Moralis.Query(Question);
         const obj = await query
         .equalTo("ID", String(tokenId)) //tokenId
         .find()
      
         obj[0].increment("attempt");
         obj[0].save();
      }

      await incrementAttempt()
   }

   return guess
}