import { 
   Body,
   Header,
   TextInfo,
   Img,
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
            <Header>
               <DeleateModalBody>
                  <DeleateModal 
                     ref={deleate}
                     className="deleate"
                  />
               </DeleateModalBody>
            </Header>
            <TextInfo>
               Date create: 
               {
                 ` ${new Date(question.date).getFullYear()}.${new Date(question.date).getMonth()}.${new Date(question.date).getDate()}`
               }
            </TextInfo>
            <TextInfo>Id: {question.ID}</TextInfo>
            <TextInfo>How many attempts: {question.attempt}</TextInfo>
            <Img
               src={question.img} 
               alt=""
            />

            <TextInfo>The number of words broken down by letters: {question.wordbroken}</TextInfo>
            <TextInfo>Prize: ETH {question.prize - (0.05 * question.prize)}</TextInfo>
            <TextInfo>The cost of the attempt: ETH {question.attempt_price}</TextInfo>

            <Next 
               ref={deleateOk}
            >Ok</Next>
         </Body>
      </BodyBG>
   )
}

export default QuestionPreiew;