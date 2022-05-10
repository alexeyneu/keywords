import { Route, Routes} from "react-router-dom";
import CreateQuestions from "../../pages/CreateQuestions/CreateQuestions";
import Main from "../../pages/main/main";
import {Question} from "../../components/screens/question/Question";

export const Router = () => {
   return (
      <Routes>
         <Route 
            path="/"
            element={<Main />}  
         />

         <Route 
            path="/question"
            element={<Question />}  
         />

         <Route 
            path="/createQuestions"
            element={<CreateQuestions />}  
         /> 
      </Routes>
   );
}