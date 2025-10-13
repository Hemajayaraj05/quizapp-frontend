import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import {toast} from 'react-toastify'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://localhost:3001/api/auth/quiz/list",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setQuizzes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        alert("Error fetching quizzes");
        console.error("Error fetching quizzes:", err);
        toast.error('Failed to fetch quizzes!')
        
        setError(
          err.response?.data?.message ||
            "Failed to fetch quizzes. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  
  const handleQuizClick = (quizId) => {
    navigate(`/quizId/${quizId}`);
  };

 
  const handleOpenEdit = (quiz) => {
    setEditingQuiz({ ...quiz });
    setOpenEdit(true);
  };


  const handleCloseEdit = () => {
     document.activeElement?.blur();
    setEditingQuiz(null);
    setOpenEdit(false);
  };


  const handleQuizEdit = async () => {
     document.activeElement?.blur();
    try {
      const token = localStorage.getItem("token");

      const { id, quizname } = editingQuiz;

      const res = await axios.put(
        `http://localhost:3001/api/auth/quiz/update/${id}`,
        { quizname },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Quiz name updated successfully");

     
      setQuizzes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, quizname } : q))
      );

      setOpenEdit(false);
    } catch (err) {
      alert("Error editing quiz");
      console.error("Error editing quiz:", err);
    }
  };

  
  const handleQuizDelete = async (quizId) => {
  };

  
  if (loading) {
    return <div className="text-center mt-10">Loading quizzes...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  
  return (
    <div className="w-full mt-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Quiz List
        </h2>

        {quizzes.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No quizzes created yet.
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow-md border-l-4 border-purple-500 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 p-3 rounded-full bg-blue-300">
                    #{index + 1}
                  </span>

                  <h3
                    className="text-lg font-semibold text-gray-800 hover:text-purple-600"
                    onClick={() => handleQuizClick(quiz.id)}
                  >
                    {quiz.quizname?.toUpperCase()}
                  </h3>

                  <div className="flex gap-4">
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => handleOpenEdit(quiz)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleQuizDelete(quiz.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Quiz Name</DialogTitle>
        {editingQuiz && (
          <div className="flex flex-col gap-5 p-5">
            <TextField
              label="Quiz Name"
              value={editingQuiz.quizname || ""}
              onChange={(e) =>
                setEditingQuiz((prev) => ({
                  ...prev,
                  quizname: e.target.value,
                }))
              }
              fullWidth
            />
          </div>
        )}

        <DialogActions>
          <Button
            onClick={handleCloseEdit}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleQuizEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default QuizList;
