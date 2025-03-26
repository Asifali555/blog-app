import React from "react"
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Blogs from "../src/Pages/Blogs";
import About from "../src/Pages/About";
import Contact from "../src/Pages/Contact";
import Login from "../src/Pages/Login";
import Register from "../src/Pages/Register";
import Creators from "../src/Pages/Creators"
import Dashboard from "../src/Pages/Dashboard";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./Pages/Detail";
import Notfound from "./Pages/Notfound";
function App() {
  
//To hide Navbar, like not showing Navbar on dashboard, login and register
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register",].includes(location.pathname);

  const {blogs, isAuthenticated} = useAuth();///useAuth => context/AuthProvider se liya gya hai
  console.log(blogs)
  console.log(isAuthenticated);
  return(
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={isAuthenticated===true? <Home /> : <Navigate to={"/login"}/>} />{/*user autehenticated hai to login to home page dikhega*/}
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />

        {/*Update page route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
        {/*Detail page */}
        <Route exact path="/blog/:id" element={<Detail />} />
        {/*Universal route => page not found*/}
        <Route exact path="*" element={<Notfound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App
