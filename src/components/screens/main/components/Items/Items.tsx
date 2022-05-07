import { 
   ContainerQuestions,
   Questions,
   QuestionsPrev,
   QuestionsInfo,
   QuestionsHeader,
   QuestionsHeaderText,
   GuessBtn,
   Info,
   InfoText
} from "../../Main.styled"
import { WordBlocks } from "../../WordBlocks";
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom';
import {useMoralis} from "react-moralis";

export const Items = (props:any) => {
   const navigate = useNavigate()
   const {Moralis} = useMoralis();

   const navigateQuestion = useCallback((index: number) => () => {
      navigate('/question', {
         state: {
            ...props.question[index].attributes,
            id: props.question[index]._objCount,
         }
      })
   }, [props.question, navigate])

   return(
      <ContainerQuestions>
         {props.question !== null &&
            props.question.map((question:any, index:number) => {
               return(
                  <Questions key={question.id}>
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
                           <InfoText>Word: {question.attributes.wordbroken}</InfoText>

                           <WordBlocks 
                              wordbroken={question.attributes.wordbroken}
                           />
                        </Info>
                     </QuestionsInfo>
                  </Questions>
               )
            })
         }
      </ContainerQuestions>
   );
}