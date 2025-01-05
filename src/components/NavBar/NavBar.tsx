import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SeriesService } from "../../services/series-service";
import { useAppState } from "../../AppState";
import { User } from "../../@types/types";

export const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const nav=useNavigate();
  
  function executeLogOut(){
    logout()
    nav("/MainPage")
  }
  //לעבוד על קטע הקוד הזה שמוצא role שיהיה בתור קטע קוד ריפטיבי\מתודה
  const {Name}=useAppState();
  const [role,setRole]=useState("");
  const fetchData = async () => {
    try {
      const userData = await SeriesService.getUserByUserName(Name) as User;
      const userRole = userData.roles[0].name;
      return userRole;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    const getUserRole = async () => {
      try {
        if (isLoggedIn) {
          const currentRole = await fetchData();
          console.log("User role:", currentRole);
          setRole(currentRole); // Dynamically update the role when logged in
        }
      } catch (error) {
        console.error("Error getting user role:", error);
      }
    };
  
    getUserRole(); 
  }, [isLoggedIn]);
  return (
    <nav className="flex flex-row justify-between bg-slate-100 text-xl text-slate-900 dark:bg-inherit dark:text-white shadow-lg mb-1 p-4">
      <div className="flex flex-row gap-10">
       {isLoggedIn&& <NavLink to="/Choose">
          <BsHouse />
        </NavLink>}
        {!isLoggedIn&& <NavLink to="/">
          <BsHouse />
        </NavLink>}
        {isLoggedIn && (
          <>
            <NavLink to="/seriesList">Series List</NavLink>
            <NavLink to="/Choose">Choose Screen</NavLink>
            <NavLink to="/about">About</NavLink>
            {role === "ROLE_ADMIN" && <NavLink to="/Adding_Screen">Admin Screen</NavLink>}
          </>
        )}
      </div>

      <div className="flex flex-row gap-10">
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
       
        { isLoggedIn && <button onClick={executeLogOut}>Logout</button>}
        <DarkModeToggle />
      </div>
    </nav>
  );
};
