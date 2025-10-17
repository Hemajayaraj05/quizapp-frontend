import { toast } from "react-toastify";
import { useState } from "react";
import LoginButton from "./LoginButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginCard() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    emailid: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const login = await axios.post(
        "http://localhost:4422/api/auth/login",
        form
      );
      console.log(login);
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("role", login.data.role);
      
      // toast.success("Login success");
        if (login.data.role) {
      toast.success("Login success");
      if (login.data.role === "student") {
        navigate("/student-dashboard");
      } else if (login.data.role === "teacher") {
        navigate("/teacher-dashboard");
      }
    } else {
      toast.error("Invalid email or password");
      setError("Invalid email or password");
    }
  } catch (err) {
    const errorMsg = err.response?.data?.error || "Login failed";
    toast.error(errorMsg); 
    setError(errorMsg);
  } finally {
    setForm({ emailid: "", password: "" });
  }
};


  return (
    <>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 border-y-yellow-400 rounded-2xl mb-4">
                <span className="text-2xl font-bold text-black">QuizUp</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Login in to your QuizUp account</p>
            </div>
            <div className="space-y-6 flex flex-col">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  className="px-4 py-3 border border-gray-300 rounded-lg  w-full focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  type="emailid"
                  name="emailid"
                  value={form.emailid}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  className="px-4 py-3 border border-gray-300 rounded-lg  w-full focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <LoginButton />

              <p className="text-sm text-center text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-black font-bold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
