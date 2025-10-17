import { Card, TextField } from "@mui/material";
import QuestionInput from "./commonComponents/QuestionInput";
import SaveButton from "./commonComponents/SaveButton";
import CancelButton from "./commonComponents/CancelButton";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

function OnemarkTemplate({ onQuestionAdded }) {
  const [QuestionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const quizId = localStorage.getItem("quizId");

  const handleSave = async () => {
    try {
      const OnemarkQuestion = await axios.post(
        "http://localhost:3001/api/auth/questions/create",
        { quizId, type: "onemark", question: QuestionText, answer: answer }
      );
      console.log(OnemarkQuestion);
      // console.log(OnemarkQuestion.status);
      toast.success("One mark question added");
       if (onQuestionAdded) onQuestionAdded();
      setQuestionText("");
      setAnswer("");
    } catch (err) {
      console.log(err, "Failed to save the one mark question");
      toast.error('Failed to save')
    }
  };

  const handleCancel = () => {
    setQuestionText("");
    setAnswer("");
  };

  return (
    <Card className="flex flex-col justify-center items-center mt-5 p-4 ">
      <div className="flex flex-col">
        <QuestionInput value={QuestionText} onChange={setQuestionText} />
        <div className="flex justify-center mt-5 mb-5 ">
          <TextField
            label="Answer"
            placeholder="Enter correct answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            size="small"
          />
        </div>
        <div className="flex justify-center gap-4">
          <SaveButton onClick={handleSave} />
          <CancelButton onClick={handleCancel} />
        </div>
      </div>
    </Card>
  );
}
export default OnemarkTemplate;
