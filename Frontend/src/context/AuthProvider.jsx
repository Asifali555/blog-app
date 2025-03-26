
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';




export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);//Will check whether the user is valid or not (My profile root is authenticated used)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/blogs/all-blogs", {//backned ka api hai
                    withCredentials: true,  // This sends cookies with the request
                });
                setBlogs(data);
            } catch (error) {
                console.log("Error fetching blogs:", error.response ? error.response.data : error.message);
            }
        };

         //Getting the profile of logged in userv
        const fetchProfile = async () => {
            try {
                
                const { data } = await axios.get("http://localhost:3000/api/users/my-profile", {//api of backend
                    withCredentials: true,  // This sends cookies with the request
                    headers: {'Content-Type': 'application/json'}
                });
                setProfile(data);
                setIsAuthenticated(true);
            } catch (error) {
                console.log("Error fetching blogs:", error.response ? error.response.data : error.message);
            }
        };
        
        fetchProfile();
        fetchBlogs();
    }, []);

    return (
        <AuthContext.Provider value={{ blogs,setProfile, profile, isAuthenticated, setIsAuthenticated}}> {/*These are the blogs mentioned above in useState */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 