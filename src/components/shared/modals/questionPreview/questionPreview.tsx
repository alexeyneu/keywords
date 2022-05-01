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
import { useCallback, } from "react"

const QuestionPreiew:React.FC<props> = ({setModal, question}) => {

   const thisDeleateModal = useCallback((event:any) => {
      console.log(event.target.className);

      (event.target.className === "sc-bjUoiL gZNbSN" ||
      event.target.className === "sc-hHLeRK bmAAez deleate") &&
      setModal(undefined)
   }, [setModal])

   return(
      <BodyBG onClick={(event: any) => thisDeleateModal(event)}>
         <Body>
            <Header>
               <DeleateModalBody>
                  <DeleateModal 
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
            <TextInfo>Id: {question.id}</TextInfo>
            <TextInfo>How many attempts: {question.attempt}</TextInfo>
            <Img
               src={question.img} 
               alt=""
            />
            <TextInfo>The number of words broken down by letters: {question.wordbroken}</TextInfo>
            <TextInfo>Prize: ETH {question.prize}</TextInfo> {/* с учетом коммисии */}
            <TextInfo>The cost of the attempt: ETH {question.attempt_price}</TextInfo>

            <Next onClick={(event: any) => thisDeleateModal(event)} >Ok</Next>
         </Body>
      </BodyBG>
   )
}

export default QuestionPreiew;