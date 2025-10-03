import {TextField} from "@mui/material";


function QuestionInput({value,onChange}) {

  return (
    <>
      <TextField
        type="text"
        label="Enter Question"
        variant="outlined"
        className="w-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></TextField>
    </>
  );
}

export default QuestionInput;
