import { 
   Container,
   AboutTitle,
   AboutText
} from "./Main.styled"

import {useState, useEffect, useDeferredValue} from 'react'
import {useMoralis} from "react-moralis";
import Pagination from "./components/pagination/Pagination";
import { Items } from "./components/Items/Items";
import { Filter } from "./components/Filter/Filter";

export interface filter{
   guessed:boolean;
   date:boolean;
   prize:boolean;
   attempts:boolean;
   my:boolean;
}

const MainComp = () => {
   const {Moralis, isInitialized} = useMoralis();
   const [pages, setPages] = useState<number>(0)
   const [allPages, setAllPages] = useState<number>(0);
   const [question, setQuestion] = useState<any>(null)
   
   const [filter, setFilter] = useState<filter>({
      guessed:false,
      date:false,
      prize:false,
      attempts:false,
      my:false,
   })

   const filterDeferred = useDeferredValue(filter)
   const pagesDeferred = useDeferredValue(pages)

   useEffect(() => {
      async function getQuestions () {
         const Questions = Moralis.Object.extend("questions");
         const query = new Moralis.Query(Questions);
         filterDeferred.prize && query.descending("prize")
         filterDeferred.date && query.descending("date")
         filterDeferred.attempts && query.descending("attempt")
         query.equalTo("guessed", filterDeferred.guessed)
         filterDeferred.my && query.equalTo("user", Moralis.User.current())
         const objAll = await query
         .find();

         setAllPages(objAll.length)

         const obj = await query
         .limit(10)
         .skip(10 * pagesDeferred)
         .find()

         setQuestion(obj)
      }

      if(isInitialized) {
         console.log('1')
         getQuestions() 
      }
   }, [pagesDeferred, filterDeferred, Moralis, isInitialized])

   return(
      <Container>
         <AboutTitle>About</AboutTitle>
         <AboutText>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
         </AboutText>

         <Filter 
            filter={filter}
            setFilter={setFilter}
         />

         <Items 
            question={question}
         />

         <Pagination 
            pages={pages} 
            setPages={setPages}
            allPages={allPages}
         />
      </Container>
   )
}

export default MainComp;