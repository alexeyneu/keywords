import { 
   Container,
   ContainerQuestions,
   Questions,
   QuestionsTitle,
   QuestionsBlock,
   BodyFilter,
   Filtertext,
} from "./Main.styled"

import {useState, useEffect, useCallback} from 'react'
import {useNavigate} from 'react-router-dom';
import { 
   useMoralis,
} from "react-moralis";
import Pagination from "./pagination/Pagination";

interface filter{
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
   const navigate = useNavigate()
   const [filter, setFilter] = useState<filter>({
      guessed:false,
      date:false,
      prize:false,
      attempts:false,
      my:false,
   })
   
   const navigateQuestion = useCallback((index: number) => () => {
      navigate('/question', {
         state: {
            ...question[index].attributes,
            id: question[index]._objCount,
         }
      })
   }, [question])

   useEffect(() => {
      async function getQuestions () {
         const Questions = Moralis.Object.extend("questions");
         const query = new Moralis.Query(Questions);
         filter.prize && query.descending("prize")
         filter.date && query.ascending("date")
         filter.attempts && query.descending("attempt")
         query.equalTo("guessed", filter.guessed)
         filter.my && query.equalTo("user", Moralis.User.current())

         const objAll = await query
         .find();

         setAllPages(objAll.length)

         const obj = await query
         .limit(10)
         .skip(10 * pages)
         .find()

         setQuestion(obj)
      }

      if(isInitialized) {
         getQuestions() 
      }
   }, [pages, filter, Moralis, isInitialized])

   const onFilter = useCallback((state:any) => () => {
      setFilter((statePrev:filter) => {
         return {
            ...statePrev,
            ...state,
         }
      })
   }, [filter])

   return(
      <Container>

         <ContainerQuestions>
            <BodyFilter>
               <Filtertext>
                  <input 
                     type="checkbox"
                     onChange={onFilter({my:!filter.my})}
                  />
                  my questions
               </Filtertext>

               <Filtertext>
                  <input 
                     type="checkbox"
                     onChange={onFilter({guessed:!filter.guessed})}
                  />
                  all guessed questions
               </Filtertext>

               <Filtertext>
                  <input 
                     type="checkbox"
                     onChange={onFilter({date:!filter.date})}
                  />
                  From old questions to new ones
               </Filtertext>

               <Filtertext>
                  <input 
                     type="checkbox"
                     onChange={onFilter({prize:!filter.prize})}
                  />
                  From a bigger prize to a smaller one
               </Filtertext>

               <Filtertext>
                  <input 
                     type="checkbox"
                     onChange={onFilter({attempts:!filter.attempts})}
                  />
                  From big attempts to smaller ones
               </Filtertext>
            </BodyFilter>

            {question !== null &&
               question.map((question:any, index:number) => {
                  return(
                     <div key={question.date}>
                        <Questions onClick={navigateQuestion(index)}>
                           <QuestionsBlock>
                              <QuestionsTitle>Question №: {Number(question.attributes.ID)}</QuestionsTitle>
                              <QuestionsTitle>Image URL: {question.attributes.img} </QuestionsTitle>
                           </QuestionsBlock>

                           <QuestionsBlock>
                              <QuestionsTitle>Number of words: {question.attributes.wordbroken}</QuestionsTitle>
                              <QuestionsTitle>Attempts made: {question.attributes.attempt}</QuestionsTitle>
                              <QuestionsTitle>Date create: 
                                 {
                                 `  ${new Date(question.updatedAt).getFullYear()}.
                                    ${new Date(question.updatedAt).getMonth()}.
                                    ${new Date(question.updatedAt).getDate()}
                                 `
                                 }
                              </QuestionsTitle>
                           </QuestionsBlock>
                        </Questions>
                     </div>
                  )
               })
            }

         <Pagination 
            pages={pages}
            allPages={allPages}
            setPages={setPages}
         />

         </ContainerQuestions>
      </Container>
   )
}

export default MainComp;