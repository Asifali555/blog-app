import React, { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast';
import {useAuth} from "../context/AuthProvider";


const Register = () => {
  const {isAuthenticated, setIsAuthenticated, setProfile}=useAuth();
  const navigateTo = useNavigate();

  const[name, setName]=useState("")
  const[email, setEmail]=useState("")
  const [phone, setPhone]=useState("")
  const[password, setPassword]=useState("")
  const[role, setRole]=useState("")
  const[education, setEducation]=useState("")
  const[photo,setPhoto]=useState("")
  const[photoPreview,setPhotoPreview]=useState('')


  //image upload karne karne ke liye
  const changePhotoHandler = (e) => {
    console.log(e);
    const file=e.target.files[0];//image get kar rahe hai
    const reader=new FileReader()//image read
    reader.readAsDataURL(file)
    reader.onload =() =>{
      setPhotoPreview(reader.result);//file ka url ka  paas kar rhe hai
      setPhoto(file)
    }
  }

  //backend ko call rahe hai register karane ke liye

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    if (photo) {
      formData.append("photo", photo);
    }
  
    // Log the FormData fields
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    try {
      const { data } = await axios.post("http://localhost:3000/api/users/register", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log(data);
      toast.success("User registered successfully");
  
      // Reset fields
      setProfile(data)//jb user login kar raha user ka data bhej rahai (context api => AuthPrivder ke profile useState me)
      setIsAuthenticated(true);//registration karen ke baad authenitcation bna rah
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto(null);
      setPhotoPreview("");
      navigateTo("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  

  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
        <form onSubmit={handleRegister}>
          <div className='font-semibold text-xl items-center text-center'>
            Cilli<span className='text-blue-500'>Blog</span>
          </div>
          <h1 className='text-xl font-semibold mb-6'>Register</h1>
          <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className='mb-4'>
            <input
            type='text'
            placeholder='Your Name'
            value={name}//name => upr useState me define hai
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 border rounded-md'
            />
          </div>

          <div className='mb-4'>
            <input
            type='email'
            placeholder='Your Email Address'
            value={email}//email => upr useState me define hai
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded-md'
            />
          </div>

          <div className='mb-4'>
            <input
            type='number'
            placeholder='Your Phone Number'
            value={phone}//phone => upr useState me define hai
            onChange={(e) => setPhone(e.target.value)}
            className='w-full p-2 border rounded-md'
            />
          </div>

          <div className='mb-4'>
            <input
            type='password'
            placeholder='Your Password'
            value={password}//password => upr useState me define hai
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded-md'
            />
          </div>
          <select value={education}onChange={(e) => setEducation(e.target.value)} className='w-full p-2 mb-4 border rounded-md'>
            <option value="">Select Area</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
          </select>
          <div className='flex items-center mb-4'>
            <div className='photo w-20 h-20 mr-4'>
              <img src={photoPreview? `${photoPreview} `: "photo"} alt='photo' />
            </div>
            <input type='file' onChange={changePhotoHandler} className='w-full p-2 border rounded-md'/>
          </div>
          <p className='text-center mb-4'>
            Already registered?(" ")
            <Link to="/login" className="text-blue-600">Login Now</Link>
          </p>
          <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white'>Register</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Register