import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Navigate } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard";  
import TeacherDashboard from "./pages/TeacherDashboard"; 
import Layout from './component/Layout';
import AddQuestions from './pages/AddQuestions';
import QuestionList from './component/QuestionList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout/>}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> 
          <Route path="/teacher-dashboard/add-questions" element={<AddQuestions/>}/>
          <Route path = "/quizId/:quizId" element ={<QuestionList />}/>
        </Route>   
      </Routes>

    </BrowserRouter>
    <ToastContainer position='top-right' autoClose={3000}/> 

    
    </>
  );
}

export default App