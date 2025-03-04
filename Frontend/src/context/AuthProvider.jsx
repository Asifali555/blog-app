//context => state globally state manage karta hai ye backend se data fetch kar rha hai
//jb hm logged in kar rahe hai to token generate karr rahe the or frontend me token chahiye use ko authenticate kra ne liye
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';




export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);//check karenge ki user valide hai ki nahi(my profile route isAuthenticated ka use hua hai)

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

         //logged in user ka profile get kar rhe hai
        const fetchProfile = async () => {
            try {
                
                const { data } = await axios.get("http://localhost:3000/api/users/my-profile", {//backned ka api hai
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
        <AuthContext.Provider value={{ blogs,setProfile, profile, isAuthenticated, setIsAuthenticated}}> {/*ye jo blogs hai upr me jo ustate hai wahi hai */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 