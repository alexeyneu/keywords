import { 
   Body,
   QuestionsPrev,
   Info,
   InfoBody,
   InfoText,
   Next,
} from "../question/Question.styled"

import {
   BodyBG,
   DeleateModalBody,
   DeleateModal
} from '../../UI/Modals'

import {props} from '../question/question.type'
import { useCallback, useRef } from "react"

const QuestionPreiew:React.FC<props> = ({setModal, question}) => {
   const deleateBg = useRef<HTMLDivElement>(null);
   const deleate = useRef<HTMLButtonElement>(null);
   const deleateOk = useRef<HTMLButtonElement>(null);
   
   const thisDeleateModal = useCallback((event:any) => {
      if(
         deleateBg.current !== null &&
         deleateOk.current !== null &&
         deleate.current !== null 
      ) {

         (event.target.className === deleate.current.className ||
         event.target.className === deleateOk.current.className ||
         event.target.className === deleateBg.current.className) &&
         setModal &&
         setModal(undefined)
      }

   }, [setModal, deleate, deleateBg])

   return(
      <BodyBG 
         ref={deleateBg}
         onClick={(event: any) => thisDeleateModal(event)}
      >
         <Body>
            <DeleateModalBody>
               <DeleateModal 
                  ref={deleate}
                  className="deleate"
               />
            </DeleateModalBody>

            <QuestionsPrev 
               src={question.img}
               alt=""
            />

            <Info>
               <InfoBody>
                  <InfoText>Prize: {question.prize} ETH</InfoText>
                  <InfoText>Question: #{question.ID}</InfoText>
                  <InfoText>Attempts made: {question.attempt}</InfoText>
                  <InfoText>The cost of the attmept: {question.attempt_price} ETH</InfoText>
                  <InfoText>Word: {question.wordbroken}</InfoText>
               </InfoBody>

               <Next 
                  ref={deleateOk}
                  onClick={(event: any) => thisDeleateModal(event)}
               >
                  ok
               </Next>
            </Info>
         </Body>
      </BodyBG>
   )
}

export default QuestionPreiew;