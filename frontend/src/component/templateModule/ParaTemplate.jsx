import { Card ,TextField} from "@mui/material";
import QuestionInput from "./commonComponents/QuestionInput";
import SaveButton from "./commonComponents/SaveButton";
import CancelButton from "./commonComponents/CancelButton";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

function ParaTemplate({ onQuestionAdded }) {
  const [paraAnswer, setparaAnswer] = useState("");
    const [ParaQuestionText, setParaQuestionText] = useState("");  
     const quizId = localStorage.getItem("quizId");
   
     const handleSave = async () => {
       try {
         const ParagraphQuestion = await axios.post(
           "http://localhost:3001/api/auth/questions/create",
           { quizId, type: "paragraph", question: ParaQuestionText, answer: paraAnswer }
         );
         console.log(ParagraphQuestion);
         toast.success("Paragraph question added");
          if (onQuestionAdded) onQuestionAdded();
         setParaQuestionText("");
         setparaAnswer("");
       } catch (err) {
         console.log(err, "Failed to save the paragraph question");
         toast.error("Failed to add!")
       }
     };
   
     const handleCancel = () => {
       setParaQuestionText("");
       setparaAnswer("");
     };

  return (
    <Card className="flex flex-col justify-center items-center mt-5 p-4">
      <div className="flex flex-col">
        <QuestionInput value={ParaQuestionText} onChange={setParaQuestionText} />
        <div className="flex justify-center mt-5 mb-5 ">
        <TextField
          label="Answer"
          placeholder="Enter detailed answer"
          value={paraAnswer}
          onChange={(e) => setparaAnswer(e.target.value)}
          size="small"
          multiline
          minRows={3}
          maxRows={10} 
          fullWidth
        />
        </div>
        <div className="flex justify-center gap-4">
          <SaveButton  onClick={handleSave}/>
          <CancelButton onClick={handleCancel}/>
        </div>
      </div>
    </Card>
  );
}
export default ParaTemplate;
