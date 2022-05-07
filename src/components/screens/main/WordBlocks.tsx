import { 
   BlockWordFlex,
   BlockWord,
   BlockNewWord,
} from "./Main.styled"
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
            let arrNumberUnique = [];
            arrNumberUnique.push()

            setWordArr((prevState: any[]) => {
               return [
                  ...prevState, 
                  wordbrokenArr[i + 1][0] // число
               ]
            })
         }
      }
   }, [])

   return (
      <BlockWordFlex>
         {wordArray.map((word:string, index:number) => {
            if(word === wordArray[index - 1]) {
               
               return(
                  <BlockWord key={index} />
               );
            } else {
               return(
                  <BlockNewWord key={index} />
               );
            }
         })}
      </BlockWordFlex>
   );
}