import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, TextField, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
function QuestionList({refresh}) {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
     const [openEdit, setOpenEdit] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
 

    
  const fetchQuestions=async()=>{
     if (!quizId) return;
    try{
      const response=await axios.get(`http://localhost:3001/api/auth/questions/list?quizId=${quizId}`)
      setQuestions(response.data);

    }catch(err)
    {
       console.log(err);
    }
    
  }

   useEffect(()=>{
    fetchQuestions();
  },[quizId,refresh])



  const handleDelete = (id) => {
    console.log("will do later",id)
  };

  const handleOpenEdit = (q) => {
    setEditingQuestion({ ...q });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setEditingQuestion(null);
    setOpenEdit(false);
  };

  const handleSaveEdit = () => {
    console.log("will do later",id);
  };

  if (!questions.length) return <Card className="mt-6 p-4 w-full"><h2>No Questions Yet</h2></Card>;

  return (
    <div className="mt-6 p-4 w-3/4 border-3 rounded-2xl border-purple-700">
      <h2 className="text-xl font-bold mb-4">Questions</h2>
      {questions.map(q => (
        <div key={q.id} className="mb-3 pb-2 ">
          <p className="font-semibold">{q.question_type.toUpperCase()}: {q.questionText}</p>
          <p className="text-gray-700">Answer: {q.answer}</p>

          <div className="mt-2 flex gap-2">
            <Button variant="contained" size="small" color="secondary" onClick={() => handleOpenEdit(q)}>Edit</Button>
            <Button variant="contained" color="error" size="small" onClick={() => handleDelete(q.id)}>Delete</Button>
          </div>
        </div>
      ))}

    
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle >Edit Question</DialogTitle>
        <div className="flex flex-col gap-5 p-5">
          <TextField
            label="Question"
            value={editingQuestion?.questionText || ""}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })}
            fullWidth
          />
          <TextField
            label="Answer"
            value={editingQuestion?.answer || ""}
            onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
            fullWidth
          />
        </div>
        <DialogActions>
          <Button onClick={handleCloseEdit} variant="contained" color="secondary">Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="secondary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuestionList;