import {
   Success,
} from "./Success.styled"

import {
   ErrorBg,
   ErrorModalUI,
   ErrorHeader,
} from '../error/Error.styled'

import {
   DeleateModalBody,
   DeleateModal
} from '../../UI/Modals'

import { useAppDispatch } from "../../../../store/hooks"
import { setSuccess } from "../../../../store/sliced/success/success.slice"



interface props {
   message:string;
}

export const SuccessModal = ({message}:props) => {
   const dispatch = useAppDispatch();

   return(
      <ErrorBg>
         <ErrorModalUI>
            <ErrorHeader>
               <DeleateModalBody onClick={() => {dispatch(setSuccess(''))}}>
                  <DeleateModal 
                     className="deleate"
                  />
               </DeleateModalBody>
            </ErrorHeader>

            <Success>{message}</Success>
         </ErrorModalUI>
      </ErrorBg>
   );
}