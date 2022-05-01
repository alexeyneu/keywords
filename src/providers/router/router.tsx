

import { Route, Routes} from "react-router-dom";
import Kabinet from "../../pages/Kabinet/Kabinet";
import CreateQuestions from "../../pages/CreateQuestions/CreateQuestions";
import Main from "../../pages/main/main";

export const Router = () => {
   return (
      <Routes>
         <Route 
            path="/"
            element={<Main />}  
         /> 

         <Route 
            path="/kabinet"
            element={<Kabinet />}  
         /> 

         <Route 
            path="/createQuestions"
            element={<CreateQuestions />}  
         /> 
      </Routes>
   );
}