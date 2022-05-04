import {
   GuessedBg,
   GuessedModal,
   HeaderGuessed,
   GuessedForm,
   GuessedInput,
   Error,
   Next,
} from "./Guessed.styled"

import {
   DeleateModalBody,
   DeleateModal
} from '../../UI/Modals'

import {Formik} from 'formik'
import * as yup from 'yup';
import { useCallback, useMemo, useRef, useState } from "react"
import {wordValid} from '../../../../shared/variable'
import {useMoralis} from 'react-moralis'
import lock from '../../../../assets/img/lock.svg'
import {useGuess} from '../../../../hooks/guess'

interface props{
   setModal:React.Dispatch<any>;
   question:any;
}

export const Guessed = ({setModal, question}: props) => {
   const {chainId, isWeb3Enabled, isAuthenticated, authenticate} = useMoralis()
   const [status, setStatus] = useState<string>('')
   const guess = useGuess()

   const valid = useMemo(() => {
      return yup.object().shape({
         Word: wordValid,
      })
   }, [])

   const deleateBg = useRef<HTMLDivElement>(null);
   const deleate = useRef<HTMLButtonElement>(null);

   const thisDeleateModal = useCallback((event:any) => {
      if(
         deleateBg.current !== null &&
         deleate.current !== null 
      ) {

         (event.target.className === deleate.current.className ||
         event.target.className === deleateBg.current.className) &&
         setModal &&
         setModal(undefined)
      }

   }, [setModal, deleate, deleateBg])

   return(
      <GuessedBg 
         onClick={(event: any) => thisDeleateModal(event)}
         ref={deleateBg}
      >
         <GuessedModal>
            <HeaderGuessed>
               <DeleateModalBody>
                  <DeleateModal 
                     className="deleate"
                     ref={deleate}
                  />
               </DeleateModalBody>
            </HeaderGuessed>
            <Formik
               initialValues={{
                  Word:'',
               }}
               validationSchema={valid}
               onSubmit={async (values) => {
                  if(!isWeb3Enabled || !isAuthenticated) {
                     await authenticate()
                  }

                  setStatus("Sending a word for verification");

                  !question.guessed && 
                  guess(String(question.ID), question.attempt_price, question.prize, values.Word, setStatus)
               }}
            >
               {({ errors, touched, values, }) => (
                  <GuessedForm>
                     <GuessedInput 
                        value={values.Word} 
                        name='Word'
                        placeholder='Word'
                        type='text'
                        autoComplete="off"
                        required
                     />

                     {errors.Word && touched.Word && <Error>{errors.Word}</Error>}

                     {status === "Sending a word for verification" ?
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        :
                        <Next type="submit">
                           {
                           (chainId === '0x4' &&
                           isWeb3Enabled) || 
                           isAuthenticated ?
                              'ok'
                              :
                              <img 
                                 width="25px"
                                 src={lock}
                                 alt=""
                              />
                           }
                        </Next>
                     }
                  </GuessedForm>
               )}
            </Formik>
         </GuessedModal>
      </GuessedBg>
   );
}