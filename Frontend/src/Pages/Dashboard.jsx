import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Sidebar from '../dashboard/Sidebar';
import MyProfile from "../dashboard/MyProfile";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyBlogs from "../dashboard/MyBlogs";
import { Navigate } from 'react-router-dom';


const Dashboard = () => {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs")

  console.log("Profile in Dashboard:", profile);
  console.log("Is Authenticated:", isAuthenticated);


  //agr user authenticated(logged in ) nahi hai to home page pr redirect ho jayega
  if(!isAuthenticated){
    return <Navigate to={"/"} />
  }
  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (<MyProfile />)
      : component === "Create Blog" ? (<CreateBlog />)
      : component === "Update Blog" ? (<UpdateBlog />)
      : (<MyBlogs />
      )}
    </div>
  );
};

export default Dashboard;
