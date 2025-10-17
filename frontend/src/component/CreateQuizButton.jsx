import { Button } from "@mui/material";
import QuizName from "./QuizName";
import { useState } from "react";

function CreateQuizButton() {
    const [showQuizName, setShowQuizName] = useState(false);

  return (
    <div className="flex flex-col justify-center">
      
      <div className="flex h-10 m-20 justify-center">
        <Button variant="contained" color="secondary" onClick={()=>setShowQuizName(true)}>
          CreateQuiz
        </Button>
      </div>

      {showQuizName && <QuizName/>}
    
    </div>
  );
}

export default CreateQuizButton;
