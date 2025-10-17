import CreateQuizButton from "../component/CreateQuizButton";
import QuizList from "../component/QuizList";

function TeacherDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-cyan-300 to-pink-400 p-5">
     
      <div className="mb-5">
        <CreateQuizButton />
      </div>

   
      <div className="flex-1 overflow-auto">
        <QuizList />
      </div>
    </div>
  );
}

export default TeacherDashboard;
