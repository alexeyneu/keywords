import { 
   Body,
   Header,
   TextInfo,
   Img,
   Next,
} from "./Question.styled"

import {
   BodyBG,
   DeleateModalBody,
   DeleateModal
} from '../../UI/Modals'

import {props} from './question.type'
import { useCallback, useState } from "react"
import {deleateModal} from '../../../../shared/logic/deleateModal'
import { Guessed } from "../guessed/Guessed"

const QuestionComp:React.FC<props> = ({setModal, question}) => {
   const [guessedModal, setGuessedModal] = useState<boolean>(false);

   const thisDeleateModal = useCallback((event:any) => {
      deleateModal(event, setModal, ["sc-idiyUo bgfDtg", "sc-hHLeRK bmAAez deleate"])
   }, [setModal])

   return(
      <BodyBG onClick={(event: any) => thisDeleateModal(event)}>
         {guessedModal &&
            <Guessed 
               setModal={setGuessedModal}
               question={question}
            />         
         }

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
            <TextInfo>Prize: ETH {question.prize}</TextInfo>
            <TextInfo>The cost of the attempt: ETH {question.attempt_price}</TextInfo>

            <Next onClick={() => setGuessedModal(true)}>Try to guess</Next>
         </Body>
      </BodyBG>
   )
}

export default QuestionComp;