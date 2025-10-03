
import { Outlet } from "react-router-dom";
import Navbar from "./templateModule/Navbar";
import Footer from "./templateModule/Footer";

export default function Layout() {
  return (
    <>
    {/* <div className=""> */}
      
      <Navbar/>
      <main className="flex-grow mt-16"> 
      <Outlet/>
      </main>
      <Footer/>
      
    {/* </div> */}
    </>
  );
}
