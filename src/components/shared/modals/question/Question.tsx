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
import { useState } from "react"
import { useMoralis } from "react-moralis"
import { Guessed } from "../guessed/Guessed"
import {useNavigate} from 'react-router-dom';
import lock from '../../../../assets/img/lock.svg'

const QuestionComp:React.FC<props> = ({question}) => {
   const [guessedModal, setGuessedModal] = useState<boolean>(false);
   const {Moralis, isAuthenticated} = useMoralis()
   const navigate = useNavigate()
   console.log(isAuthenticated)
   
   return(
      <BodyBG >
         {guessedModal &&
            <Guessed 
               setModal={setGuessedModal}
               question={question}
            />         
         }

         <Body>
            <Header>
               <DeleateModalBody onClick={() => {navigate('/')}}>
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
            <TextInfo>Question №: {question.ID}</TextInfo>
            <TextInfo>How many attempts: {question.attempt}</TextInfo>
            <Img
               src={question.img} 
               alt=""
            />
            <TextInfo>The number of words broken down by letters: {question.wordbroken}</TextInfo>
            <TextInfo>Prize: ETH {question.prize}</TextInfo>
            <TextInfo>The cost of the attempt: ETH {Moralis.Units.FromWei(question.attempt_price)}</TextInfo>
            
            <Next onClick={() => setGuessedModal(true)}>
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
         </Body>
      </BodyBG>
   )
}

export default QuestionComp;