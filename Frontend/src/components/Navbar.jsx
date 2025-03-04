import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [show, setShow] = useState(false);

  const {profile, isAuthenticated, setIsAuthenticated}=useAuth();
  console.log(profile?.user);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3000/api/users/logout", { withCredentials: true });
      setIsAuthenticated(false);
      navigateTo("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout");
    }
  };
  return (
    <>
    <nav className='shadow-lg px-4 py-3'>
      <div className='flex items-center justify-between container mx-auto'>
        <div className='font-semibold text-xl'>
          Cilli<span className='text-blue-500'>Blog</span>
        </div>
        {/*for Desktop navbar  || md=> medium screen size se chota hoga to nav ka ye part hiddn ho jayega*/}
        <div className='mx-6'>
          <ul className='hidden md:flex space-x-6'>
            <Link className='hover:text-blue-500' to="/">HOME</Link>
            <Link className='hover:text-blue-500' to="/blogs">BLOGS</Link>
            <Link className='hover:text-blue-500' to="/creators">CREATORS</Link>
            <Link className='hover:text-blue-500' to="/about">ABOUT</Link>
            <Link className='hover:text-blue-500' to="/contact">CONTACT</Link>
          </ul>
          <div className='md:hidden' onClick={() => setShow(!show)}>
            {show ? <IoCloseSharp size={24}/> : <AiOutlineMenu size={24} />}
          </div>
        </div>
        <div className='flex space-x-2'>
          {/*agr user loggedin hai sath sath admin hai to hi dashboard dikhega */}
          {isAuthenticated && profile?.user?.role==="admin" 
          ? (<Link className='bg-blue-500 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded' to="/dashboard">DASHBOARD</Link>)
          :("")}

          {/*agr user authenticate nahi hai to login button dikhega or authenticated hai to logout button dikhega  */}
          {!isAuthenticated ? (
            <Link className='bg-red-500 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded' to="/Login">LOGIN</Link>
          ) :(
            <Link onClick={handleLogout} className='bg-red-500 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded' to="/Login">LOGOUT</Link>
          )}
        </div>
      </div>

      {/*for Mobile Navbar => show ki value true hai */}
      {show && (
        <div  className='bg-white'>
          <ul className='flex flex-col h-screen items-center justify-center space-y-3 md:hidden  text-xl'>
            <Link className='hover:text-blue-500' onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to="/">HOME</Link>
            <Link className='hover:text-blue-500' onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to="/blogs">BLOGS</Link>
            <Link className='hover:text-blue-500' onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to="/creators">CREATORS</Link>
            <Link className='hover:text-blue-500' onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to="/about">ABOUT</Link>
            <Link className='hover:text-blue-500' onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" to="/contact">CONTACT</Link>
          </ul>
        </div>
      )}
    </nav>
    </>
  )
}

export default Navbar