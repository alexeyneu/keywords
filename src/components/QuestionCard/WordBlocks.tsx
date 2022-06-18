import {InputKeyWord} from "../UI/InputKeyWord/InputKeyWord";
import {useState, useEffect} from 'react'

interface props {
   wordbroken:string;
}

export const WordBlocks = ({wordbroken}: props) => {
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
                  iWord === 0 && i !== 0 ? '' : wordbrokenArr[i + 1] // число
               ]
            })
         }
      }
   }, [])

   return (
      <>
         {wordArray.map((word:string, index:number) => {
            if(word !== '') {
               return(
                  <InputKeyWord margin={"0"} key={index} />
               );
            } else {
               return(
                  <InputKeyWord margin={"2em"} key={index} />
               );
            }
         })}
      </>
   );
}