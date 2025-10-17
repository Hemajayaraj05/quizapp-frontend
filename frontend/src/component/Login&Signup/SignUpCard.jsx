import {toast} from 'react-toastify'
import { useState } from "react";
import SignUpButton from "./SignUpButton";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SignUpCard() {
  const [form, setForm] = useState({
    username: "",
    emailid: "",
    password: "",
    role: "student",
  }); 


  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4422/api/auth/signup",
        form
      );
      console.log(res);
    
      toast.success("Signup success");
      navigate('/login')

    } catch (err) {
      console.log("Err in signup", err);
      toast.error("Signin Failed!")
    }
  };

  return (
    <>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
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

            <div className="space-y-5 flex flex-col">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  className="px-4 py-3 border border-gray-300 rounded-lg  w-full ocus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  className="px-4 py-3 border border-gray-300 rounded-lg  w-full ocus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  type="text"
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
                  className="px-4 py-3 border border-gray-300 rounded-lg  w-full ocus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      form.role === "student"
                        ? "border-yellow-400 bg-white text-yellow-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={form.role === "student"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-medium">Student</span>
                  </label>

                  <label
                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      form.role === "teacher"
                        ? "border-yellow-400 bg-white text-yellow-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={form.role === "teacher"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-medium">Teacher</span>
                  </label>
                </div>
              </div>

              <SignUpButton />

              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link to="/" className="text-black font-bold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
