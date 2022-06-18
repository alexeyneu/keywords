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
import {useEffect, useState} from 'react'

export const  useGuess = (tokenId:string, prize:number, dispatchNotification: (props: PayloadType) => void) => {
   const dispatch = useAppDispatch();
   const { fetch } = useWeb3ExecuteFunction()
   const { Moralis} = useMoralis()
   const [contract, setContract] = useState<any>(false);

   useEffect(() => {
      async function getContract() {
        const ethers = Moralis.web3Library;
        const provider: any = await Moralis.enableWeb3()
        const Contract = new ethers.Contract(address, abi, provider);
        setContract(Contract)
      }
  
      getContract()
    }, [Moralis])
  
    useEffect(() => {
      const onIdNft = async (result: boolean) => {
         async function isGuessed() {
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
      }
  
      if(contract) {
         contract.on('isGuessed', onIdNft)
      }
      
      return () => {
         if(contract) {
            contract.off('isGuessed', onIdNft)
         }
      }
    }, [contract])

   const guess = async (tokenId:string, msgValue:number, word:string ) => {
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