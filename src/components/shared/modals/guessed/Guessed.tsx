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
import { useCallback, useMemo, useRef } from "react"
import {wordValid} from '../../../../shared/variable'
import {useMoralis} from 'react-moralis'
import lock from '../../../../assets/img/lock.svg'
import {useGuess} from '../../../../hooks/guess'

interface props{
   setModal:React.Dispatch<any>;
   question:any;
}

export const Guessed = ({setModal, question}: props) => {
   const {chainId, isWeb3Enabled} = useMoralis()
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
               onSubmit={(values) => {
                  !question.guessed && guess(String(Number(question.id) - 2), question.attempt_price, question.prize, values.Word)
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

                     <Next type="submit">
                        {
                        chainId === '0x4' &&
                        isWeb3Enabled ?
                           'ok'
                           :
                           <img 
                              width="25px"
                              src={lock}
                              alt=""
                           />
                        }
                     </Next>
                  </GuessedForm>
               )}
            </Formik>
         </GuessedModal>
      </GuessedBg>
   );
}