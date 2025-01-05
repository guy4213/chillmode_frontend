import {  request } from "./axios-helper";
import { baseUrl } from "./auth-service";
import axios from "axios";
import { Category, SeriesItem, SeriesItemDetails } from "../@types/types";



// base url=http://127.0.0.1:8084/api/v1

const addDirector=async(body:any)=>{
  try {
    const res = await fetch(`${baseUrl}/directors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add the Actor");
    }
    return json;
  } catch (error) {
    console.error('Error adding series:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
}
const addDirectorsToASeries=async(data:any)=>{
  try {
    const res = await fetch( `${baseUrl}/series/addDirector?SeriesId=${data.seriesId}&DirectorName=${data.directorName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add the categories");
    }
    return json;
  } catch (error) {
    console.error('Error adding series:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
}



const updateDirector =async(data:any)=>{
  try {
    const res = await axios.put( `${baseUrl}/directors/${data.id}`,data);

    const json = res.data

    if (!res.data) {
      throw new Error(json.message || "Failed updating director");
    }
    return json;
  } catch (error) {
    console.error('Failed updating the director:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
}


const  deleteDirector   =async(data:any)=>{
  try {
    const res = await fetch( `${baseUrl}/directors/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "deleting director has been failed ");
    }
    return json;
  } catch (error) {
    console.error('deleting failed', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
}

// const getPosts = async () => {
//   const token = localStorage.getItem("token") ?? "";

//   if (!token) {
//     throw new Error("Must be logged in");
//   }

//   const res = await fetch(`${baseUrl}/posts`, {
//     method: "GET",
//     headers: {
//       Authorization: `bearer ${token}`,
//     },
//   });
  
//   const json = await res.json();

//   if (!res.ok) {
//     throw json;
//   }
//   return json;
// };
export const DirectorService = {
  addDirector,
  addDirectorsToASeries,
updateDirector,
deleteDirector}