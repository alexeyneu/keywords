import QuestionComp from "../../shared/modals/question/Question";
import {useLocation} from 'react-router-dom';

export const Question = () => {
   const {state} = useLocation()

   return(
      <QuestionComp 
         question={state}
      />
   );
}