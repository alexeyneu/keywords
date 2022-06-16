import { Navigate, Route, Routes } from "react-router-dom";
import CreateQuestionCard from "../pages/CreateQuestionCard";
import HomePage from "../pages/HomePage";
import { Pages } from "../pages/Pages";

const RouterServices = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Pages/>}>
                    <Route path="/" element={ <Navigate to="/home" /> } />
                    <Route path='home' element={<HomePage/>}/>
                    <Route path='create-question-card' element={<CreateQuestionCard/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default RouterServices;