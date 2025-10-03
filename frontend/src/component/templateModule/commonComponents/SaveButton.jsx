import { Button } from "@mui/material";
function SaveButton({onClick}){

   
    return (
      <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <Button variant="contained" color="secondary" onClick={onClick}>
       Save
        </Button>
      </div>
    </div>
    )
}

export default SaveButton;