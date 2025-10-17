import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-screen h-20 flex items-center justify-between px-12 bg-gradient-to-b from-cyan-300 to-pink-400  ">

      <p className="font-bold text-2xl">
        <Link to="/teacher-dashboard" className="hover:text-blue-600 cursor-pointer">
        QuizUp</Link></p>

      <ul className="hidden md:flex gap-8 text-lg font-medium">
      <li>
          <Link to="/teacher-dashboard" className="hover:text-blue-600 cursor-pointer">
            Home
          </Link>
        </li>        
        <li className="hover:text-blue-600 cursor-pointer">About</li>
        <li className="hover:text-blue-600 cursor-pointer">Search</li>
        <li className="hover:text-blue-600 cursor-pointer">Profile</li>
      </ul>

      <button className="md:hidden p-2 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}
