import { 
   Container,
   AboutTitle,
   AboutText,
   BodyFilter,
   FilterType,
   FilterTypeTitle,
   Filtertext,
   ContainerQuestions,
   Questions,
   QuestionsPrev,
   QuestionsInfo,
   QuestionsHeader,
   QuestionsHeaderText,
   GuessBtn,
   Info,
   InfoText,
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
   }, [question, navigate])

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
         <AboutTitle>About</AboutTitle>
         <AboutText>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
         </AboutText>

         <BodyFilter>
            <FilterType>
               <FilterTypeTitle>Questions: </FilterTypeTitle>
               
               <Filtertext isChecked={!filter.guessed && !filter.my} >all |</Filtertext>
               
               <Filtertext 
                  isChecked={filter.guessed}
                  onClick={onFilter({guessed:!filter.guessed})}
               >guesse |</Filtertext>

               <Filtertext 
                  isChecked={filter.my}
                  onClick={onFilter({my:!filter.my})}
               >my</Filtertext>
            </FilterType>

            <FilterType>
               <FilterTypeTitle>Sort by: </FilterTypeTitle>

               <Filtertext 
                  isChecked={filter.date}
                  onClick={onFilter({date:!filter.date})}
               >date |</Filtertext>

               <Filtertext 
                  isChecked={filter.prize}
                  onClick={onFilter({prize:!filter.prize})}
               >prize |</Filtertext>

               <Filtertext  
                  isChecked={filter.attempts}
                  onClick={onFilter({attempts:!filter.attempts})}
               >attempts</Filtertext>
            </FilterType>
         </BodyFilter>

         <ContainerQuestions>
         {question !== null &&
            question.map((question:any, index:number) => {
               return(
                  <Questions key={question.ID}>
                     <QuestionsPrev 
                        src={question.attributes.img}
                        alt=""
                     />
                     <QuestionsInfo>
                        <QuestionsHeader>
                           <QuestionsHeaderText>Guess what is shown in the picture?</QuestionsHeaderText>
                           <QuestionsHeaderText>Prize {question.attributes.prize}</QuestionsHeaderText>
                        </QuestionsHeader>
                        <GuessBtn onClick={navigateQuestion(index)}>Guess</GuessBtn>
                     
                        <Info>
                           <InfoText>Question #{question.attributes.ID}</InfoText>
                           <InfoText>Attempts made: {question.attributes.attempt}</InfoText>
                           <InfoText>The cost of the attmept: {Moralis.Units.FromWei(question.attributes.attempt_price)}</InfoText>
                        </Info>
                     </QuestionsInfo>
                  </Questions>
               )
            })
         }
         </ContainerQuestions>

         <Pagination 
            pages={pages} 
            setPages={setPages}
            allPages={allPages}
         />
      </Container>
   )
}

export default MainComp;