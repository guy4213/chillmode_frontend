import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button';
import { useAppState } from '../AppState';
import { SeriesService } from '../services/series-service';
import { User } from '../@types/types';

const Choose = () => {
    const nav=useNavigate();
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
          const currentRole = await fetchData();
          console.log("User role:", currentRole);
          setRole(currentRole);
        } catch (error) {
          console.error("Error getting user role:", error);
        }
      };
  
      getUserRole(); // Call the function to fetch and use user role
  
      // Cleanup function (if needed)
      return () => {
        // Perform cleanup here (if needed)
      };
    }, []); // Empty dependency array to run effect only once on component mount
  return (
    <div className='text-center overflow-hidden'>
     { role=="ROLE_ADMIN"&&  <div className='text-center p-1'>
    <button onClick={() => nav("/Adding_Screen")}>
        <Button class="return" text="Admin Screen" />
      </button></div>}
      <div className='text-center  '>
       <button onClick={() => nav("/seriesList")}>
       <Button class="return" text="Series List Screen" />
     </button> </div>
     <div className='text-center'>
     <button onClick={() => nav("/about")}>
       <Button class="return" text="About" />
     </button> </div>
     </div>
  )
}
// .MainPage{
//     text-align: center;
//     padding: 8%;
//   }
//   .MainPage div { padding: 2%;}

export default Choose