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
import { useCallback, useMemo } from "react"
import { useAppDispatch } from "../../../../store/hooks"
import { setError } from "../../../../store/sliced/error/error.sliced"
import {wordValid} from '../../../../shared/variable'
import {deleateModal} from '../../../../shared/logic/deleateModal'
import {useMoralis} from 'react-moralis'
import lock from '../../../../assets/img/lock.svg'
import {useGuess} from '../../../../hooks/guess'

interface props{
   setModal:React.Dispatch<any>;
   question:any;
}

export const Guessed = ({setModal, question}: props) => {
   const dispatch = useAppDispatch();
   const {chainId, isWeb3Enabled} = useMoralis()
   const guess = useGuess()

   const valid = useMemo(() => {
      return yup.object().shape({
         Word: wordValid,
      })
   }, [])

   const DeleateGuessed = useCallback((event:any) => {
      deleateModal(event, setModal, ["sc-fLlhyt sc-llJcti jReeqr gCnfIC", "sc-iIPllB jqsUId deleate"])
   }, [setModal])

   return(
      <GuessedBg onClick={(event: any) => DeleateGuessed(event)}>
         <GuessedModal>
            <HeaderGuessed>
               <DeleateModalBody>
                  <DeleateModal 
                     className="deleate"
                  />
               </DeleateModalBody>
            </HeaderGuessed>
            <Formik
               initialValues={{
                  Word:'',
               }}
               validationSchema={valid}
               onSubmit={(values) => {
                  chainId === '0x4' && isWeb3Enabled &&
                  console.log(5, question.attempt_price, values.Word) 
                  guess('5', question.attempt_price, values.Word)
                  // dispatch(setError("You didn't guess"))
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
                        {chainId === '0x4' && isWeb3Enabled ?
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