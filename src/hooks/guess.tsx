import { 
   useWeb3ExecuteFunction,
   useMoralis,
} from "react-moralis";
import { address } from "../shared/variable";
import { useAppDispatch } from "../store/hooks";
import abi from '../shared/lib/abi.json'
import confetti from "canvas-confetti";
import { setSuccess } from "../store/sliced/success/success.slice";
import { setError } from "../store/sliced/error/error.sliced";
import { useEffect, useState} from "react";


export const  useGuess = (
   tokenId:string, 
   prize:number, 
   setStatus:React.Dispatch<React.SetStateAction<string | number>>,
) => {
   const dispatch = useAppDispatch();
   const { fetch } = useWeb3ExecuteFunction()
   const { Moralis } = useMoralis()
   const [contract, setContract] = useState<any | false>(false)
   const [allReady, setAllReady] = useState<boolean>(false)

   useEffect(() => {
      async function getContract() {
         const ethers = Moralis.web3Library;
         const provider = await Moralis.enableWeb3()
         const contract = new ethers.Contract(address, abi, provider);
         setContract(contract)
      }

      getContract()
   }, [Moralis])

   useEffect(() => {
      const getResult = (equal: boolean, tokenIdResult:number) => {

         const guessResult = async (equal: boolean, tokenIdResult:number) => {
            if(equal && Number(tokenIdResult) === Number(tokenId) - 1) {
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
               setStatus(prize)
   
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
               setStatus("You didn't guess")
            }
         }

         if(allReady) {
            guessResult(equal, tokenIdResult)
         }
         
      }

      if(contract) {
         contract.on("guessResult", getResult)
         return () => contract.off("guessResult", getResult)
      }
      
   }, [contract, allReady])

   const guess = async (tokenId:string, msgValue:number, word:string ) => {
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

         onError: (error:any) => {
            console.log(error.message);
            dispatch(setError("Try again"))
            setStatus('Try again')
         },

         onSuccess: (tx:any) => tx.wait().then((newTx:any) => {
            setAllReady(true)
         })
      });

      const incrementAttempt = async () => {
         const Question = Moralis.Object.extend("questions");
         const query = new Moralis.Query(Question);
         const obj = await query
         .equalTo("ID", String(tokenId)) 
         .find()
      
         obj[0].increment("attempt");
         obj[0].save();
      }

      await incrementAttempt()
   }

   return guess
}