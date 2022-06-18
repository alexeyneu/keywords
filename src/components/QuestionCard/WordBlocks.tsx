import {InputKeyWord} from "../UI/InputKeyWord/InputKeyWord";
import {useState, useEffect} from 'react'

interface props {
   wordbroken:string;
   disabled?:boolean;
   onChange?:(e:any, isWhitespace:boolean, countInp:number) => void;
}

export const WordBlocks = ({wordbroken, disabled = true, onChange}: props) => {
   const [wordArray, setWordArr] = useState<string[]>([])

   useEffect(() => {
      const wordbrokenArr = wordbroken.split(',');
      const lenghtWord = wordbrokenArr[0].split(':');
      wordbrokenArr.shift();
      wordbrokenArr.unshift(...lenghtWord);

      for(let i = 0; i < Number(wordbrokenArr[0]); i++) {
         for(let iWord = 0; iWord < Number(wordbrokenArr[i + 1]); iWord++) {
            
            setWordArr((prevState: any[]) => {
               return [
                  ...prevState, 
                  iWord === 0 && i !== 0 ? '' : wordbrokenArr[i + 1] 
               ]
            })
         }
      }
   }, [])

   return (
      <>
         {wordArray.map((word:string, index:number) => {
            return(
               <InputKeyWord 
                  disabled={disabled} 
                  margin={word !== '' ? "0": "2em"} 
                  key={index} 
                  onChange={onChange}
                  isWhitespace={word === ''}
                  countInp={index}
               />
            );
         })}
      </>
   );
}