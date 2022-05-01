import { 
   Container,
   ContainerQuestions,
   Questions,
   QuestionsTitle,
   QuestionsBlock,
   BodyFilter,
   Filtertext,
} from "./Main.styled"
import QuestionComp from '../../shared/modals/question/Question';

import {useState, useEffect, useCallback} from 'react'
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
   const [questionIndex, setQuestionIndex] = useState<number | false>(false)
   const [filter, setFilter] = useState<filter>({
      guessed:false,
      date:false,
      prize:false,
      attempts:false,
      my:false,
   })
   
   const setModal = useCallback((index: number) => () => {
      setQuestionIndex(index)
   }, [questionIndex])

   useEffect(() => {
      async function getQuestions () {
         const Questions = Moralis.Object.extend("questions");
         const query = new Moralis.Query(Questions);

         filter.prize && query.ascending("prize")

         filter.date && query.ascending("date")

         filter.attempts && query.descending("attempt")

         filter.guessed && query.equalTo("guessed", true)

         filter.my && query.equalTo("user", Moralis.User.current())
         const objAll = await query
         .find();
         
         // console.log(objAll)

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
         {typeof questionIndex === 'number' && 
            <QuestionComp 
               setModal={setQuestionIndex}
               question={{
                  ...question[questionIndex].attributes,
                  id:question[questionIndex].objCount
               }}
            />
         }

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
                        <Questions onClick={setModal(index)}>
                           <QuestionsBlock>
                              <QuestionsTitle>Prize: {question.attributes.prize}</QuestionsTitle>
                              <QuestionsTitle>Attempt price: {question.attributes.attempt_price}</QuestionsTitle>
                           </QuestionsBlock>

                           <QuestionsBlock>
                              <QuestionsTitle>Time Create: {question.attributes.date}</QuestionsTitle>
                              <QuestionsTitle>Attempts: {question.attributes.attempt}</QuestionsTitle>
                              {/* <QuestionsTitle>Creator: {
                                 question.attributes
                                 .user.attributes
                                 .ethAddress.toString()
                                 .replace(/.+/, (e: any) => e.slice(0,3)+'*'.repeat(e.slice(3,-3).length)+e.slice(-3))}
                              </QuestionsTitle> */}
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