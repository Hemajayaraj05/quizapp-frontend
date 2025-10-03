import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function QuizName(){
    const navigate=useNavigate();
 
    const [quizname,setQuizName]=useState(""); 
    const token=localStorage.getItem("token");
    console.log("Token",token);
    
    const handleNavigationToAddQuestions=async()=>{
         try{
            const res=await axios.post("http://localhost:3000/api/auth/quiz/create",{quizname},
                {
                    headers:{
                    Authorization :`Bearer ${token}`
                }}
            )

             console.log(res);
             console.log("quizid is",res.data.id);
             localStorage.setItem("quizId",res.data.id);
             navigate('/teacher-dashboard/add-questions');
         }
         catch(err)
         {
          console.log(err);
         }    
    }
   
    return (
        <div className="flex flex-col justify-center">
        <div className=" flex flex-col p-10 gap-3 justify center items-center">
            <TextField 
            label="Enter the quiz name"
            variant="outlined"
            value={quizname}
            onChange={(e)=>setQuizName(e.target.value)}
            />
            
            <Button variant="contained" color="secondary"
           onClick={handleNavigationToAddQuestions}>Add Questions
            </Button>            

        </div>
        
        </div>
    )
}

export default QuizName;