import {
   ErrorBg,
   ErrorModalUI,
   ErrorHeader,
   Error,
   
} from "./Error.styled"

import {
   DeleateModalBody,
   DeleateModal
} from '../../UI/Modals'

import { useAppDispatch } from "../../../../store/hooks"
import { setError } from "../../../../store/sliced/error/error.sliced"

interface props {
   message:string;
}

export const ErrorModal = ({message}:props) => {
   const dispatch = useAppDispatch();

   return(
      <ErrorBg>
         <ErrorModalUI>
            <ErrorHeader>
               <DeleateModalBody onClick={() => {dispatch(setError(''))}}>
                  <DeleateModal 
                     className="deleate"
                  />
               </DeleateModalBody>
            </ErrorHeader>

            <Error>{message}</Error>
         </ErrorModalUI>
      </ErrorBg>
   );
}