import { 
   Body,
   QuestionsPrev,
   Info,
   InfoBody,
   InfoText,
   Next,
} from "./Question.styled"

import {
   BodyBG,
   DeleateModalBody,
   DeleateModal
} from '../../UI/Modals'

import {props} from './question.type'
import { useState } from "react"
import { useMoralis } from "react-moralis"
import { Guessed } from "../guessed/Guessed"
import {useNavigate} from 'react-router-dom';
import lock from '../../../../assets/img/lock.svg'

const QuestionComp:React.FC<props> = ({question}) => {
   const [guessedModal, setGuessedModal] = useState<boolean>(false);
   const {Moralis} = useMoralis()
   const navigate = useNavigate()

   return(
      <BodyBG >
         {guessedModal &&
            <Guessed 
               setModal={setGuessedModal}
               question={question}
            />         
         }

         <Body>
            <DeleateModalBody onClick={() => {navigate('/')}}>
               <DeleateModal 
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
                  <InfoText>The cost of the attmept: {Moralis.Units.FromWei(question.attempt_price)} ETH</InfoText>
                  <InfoText>Word: {question.wordbroken}</InfoText>
               </InfoBody>

               <Next onClick={() => !question.guessed && setGuessedModal(true)}>
                  {!question.guessed ? 
                     'Try to guess'
                     :
                     <img 
                        width="25px"
                        src={lock}
                        alt=""
                     />
                  }
               </Next>
            </Info>
         </Body>
      </BodyBG>
   )
}

export default QuestionComp;