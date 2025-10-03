import { Button } from "@mui/material";
function CancelButton({onClick}){


    return (
      <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <Button variant="contained" color="secondary" onClick={onClick}>
         Cancel
        </Button>
      </div>
    </div>
    )
}

export default CancelButton;