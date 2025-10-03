import { useState, useEffect } from "react";  
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]); // always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

        const res = await axios.get("http://localhost:3001/api/auth/quiz/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

      

        
        setQuizzes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError(
          err.response?.data?.message || "Failed to fetch quizzes. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []); 

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`); 
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
                onClick={() => handleQuizClick(quiz.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">#{index + 1}</span>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600">
                    {quiz.quizname}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizList;
