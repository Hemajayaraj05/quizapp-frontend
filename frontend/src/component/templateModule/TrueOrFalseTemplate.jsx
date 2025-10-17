import { FormControlLabel, RadioGroup, Radio, Card } from "@mui/material";
import QuestionInput from "./commonComponents/QuestionInput";
import SaveButton from "./commonComponents/SaveButton";
import CancelButton from "./commonComponents/CancelButton";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

function TrueOrFalseTemplate({ onQuestionAdded }) {
  const [TFQuestionText, setTFQuestionText] = useState("");
  const [TFanswer, setTFAnswer] = useState(null);

  const quizId=localStorage.getItem('quizId');
  const handleSave = async () => {
    const TrueOrFalseResponse = await axios.post(
      "http://localhost:3001/api/auth/questions/create",
      {
        quizId,
        type: "TrueOrFalse",
        question: TFQuestionText,
        answer:TFanswer
      }
    );

    console.log(TrueOrFalseResponse);
    console.log(TrueOrFalseResponse.status);
    toast.success("TrueOrFalse question added");
    
     if (onQuestionAdded) onQuestionAdded();
    setTFQuestionText("");
    setTFAnswer("");
  };

  const handleCancel = () => {
    setTFQuestionText("");
    setTFAnswer("");
  };
  return (
    <Card className="flex flex-col justify-center items-center mt-5 p-4">
      <div className="flex flex-col">
        <QuestionInput value={TFQuestionText} onChange={setTFQuestionText} />
        <div className="flex justify-center">
          <RadioGroup
            row
            value={TFanswer}
            onChange={(e) => setTFAnswer(e.target.value)}
          >
            <FormControlLabel value="true" control={<Radio />} label="true" />
            <FormControlLabel value="false" control={<Radio />} label="false" />
          </RadioGroup>
        </div>
        <div className="flex justify-center gap-4">
          <SaveButton onClick={handleSave} />
          <CancelButton onClick={handleCancel} />
        </div>
      </div>
    </Card>
  );
}
export default TrueOrFalseTemplate;
