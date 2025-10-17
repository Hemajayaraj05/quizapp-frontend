import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
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
        console.error("Error fetching quizzes:", err);
        toast.error("Failed to fetch quizzes!");
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
    localStorage.setItem("quizId", quizId);
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

      await axios.put(
        `http://localhost:3001/api/auth/quiz/update/${id}`,
        { quizname },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Quiz name updated successfully");

      setQuizzes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, quizname } : q))
      );

      setOpenEdit(false);
    } catch (err) {
      toast.error("Error editing quiz");
      console.error("Error editing quiz:", err);
    }
  };

  const handleQuizDelete = async (quizId) => {
    document.activeElement?.blur();
      const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:3001/api/auth/quiz/delete/${quizId}`, { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Quiz deleted successfully");
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
    } catch (err) {
      console.error("Error in deleting quiz", err);
      toast.error("Error in deleting quiz");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading quizzes...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full mt-5 flex flex-col gap-4">
      {quizzes.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No quizzes created yet.
        </div>
      ) : (
        quizzes.map((quiz, index) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-md border-l-4 border-purple-500 p-5 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 p-3 rounded-full bg-blue-300">
                #{index + 1}
              </span>

              <h3
                className="text-lg font-semibold text-gray-800 hover:text-purple-600 cursor-pointer"
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
        ))
      )}

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
          <Button onClick={handleCloseEdit} variant="contained" color="secondary">
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
