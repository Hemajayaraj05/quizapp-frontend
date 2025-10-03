import { Card, TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import QuestionInput from "./commonComponents/QuestionInput";
import SaveButton from "./commonComponents/SaveButton";
import CancelButton from "./commonComponents/CancelButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../store/questionsSlice";

function ChooseTemplate() {
  const [chooseQuestionText, setChooseQuestionText] = useState("");
  const [options, setOptions] = useState([{ text: "", isCorrect: false }]);
  const dispatch = useDispatch();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleCheckboxChange = (index) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = !newOptions[index].isCorrect;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleSave = () => {
    dispatch(
      addQuestion({
        type: "choose",
        question: chooseQuestionText,
        options: options,
      })
    );

    setChooseQuestionText("");
    setOptions([{ text: "", isCorrect: false }]);
  };

  const handleCancel = () => {
    setChooseQuestionText("");
    setOptions([{ text: "", isCorrect: false }]);
  };

  return (
    <Card className="flex flex-col justify-center items-center mt-5 p-4">
      <div className="flex flex-col gap-4">
        <QuestionInput value={chooseQuestionText} onChange={setChooseQuestionText} />

        {options.map((opt, index) => (
          <div key={index} className="flex items-center gap-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={opt.isCorrect}
                  onChange={() => handleCheckboxChange(index)}
                />
              }
              label={
                <TextField
                  placeholder={`Option ${index + 1}`}
                  value={opt.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  size="small"
                />
              }
            />
          </div>
        ))}

        <Button variant="outlined" onClick={addOption}>
          + Add Option
        </Button>

        <div className="flex justify-center gap-4">
          <SaveButton onClick={handleSave} />
          <CancelButton onClick={handleCancel} />
        </div>
      </div>
    </Card>
  );
}

export default ChooseTemplate;
