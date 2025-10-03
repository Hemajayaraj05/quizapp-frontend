
import { createSlice } from "@reduxjs/toolkit";
const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    activeQuizId: null,  


    
  },
  reducers: {
    addQuiz: (state, action) => {
      const newQuiz = {
        id: Date.now().toString(),
        name: action.payload.name,
        questions: [],
      };
      state.quizzes.push(newQuiz);
      state.activeQuizId = newQuiz.id;  
    },
    setActiveQuiz: (state, action) => {
      state.activeQuizId = action.payload;
    },
    addQuestion: (state, action) => {
      const quiz = state.quizzes.find(q => q.id === state.activeQuizId);
      if (quiz) {
        quiz.questions.push(action.payload);
      }
    },
  },
});

export const { addQuiz, addQuestion, setActiveQuiz } = quizSlice.actions;
export default quizSlice.reducer;
