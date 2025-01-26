import {  request } from "./axios-helper";
import { baseUrl } from "./auth-service";
import axios from "axios";
import { Category, SeriesItem, SeriesItemDetails } from "../@types/types";



// base url=https://chillmode-backend.onrender.com/api/v1

const getAllSeries=async()=>{

  const res= await axios.get(`${baseUrl}/series?pageNo=0&pageSize=40&sortDir=asc&sortBy=seriesName`);
  
  console.log(res.data)
  return res.data;
  
  }

  
const getSeriesByIdAxios=async(p:number)=>{

const res= await  axios.get(`${baseUrl}/series/${p}`);

console.log(res.data)
return res.data;

}

const getUserIdByUserName = async (userName:string) => {
  try {
    const res = await axios.get(`${baseUrl}/users/getUserByUserName/${userName}` );
    console.log(res.data.id);
    return res.data.id; // Assuming res.data contains the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
const getUserByUserName = async (userName:string) => {
  try {
    const res = await axios.get(`${baseUrl}/users/getUserByUserName/${userName}` );
    console.log(res.data);
    return res.data; // Assuming res.data contains the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const rateCalculate=async(userId:number,id:number,rating:number)=>{
  try {
    const res = await axios.post( `${baseUrl}/series/addRate?userID=${userId}&seriesID=${id}&rate=${rating}`);
    console.log(res.data);
    return res.data; // Assuming res.data contains the user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Re-throw the error to handle it in the calling code
}
}

const addSeries = async (body:SeriesItemDetails) => {
  // Check if the required field `seriesName` is present and not null


  try {
    const res = await fetch(`${baseUrl}/series`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add the series");
    }
    return json;
  } catch (error) {
    console.error('Error adding series:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
};

const updateSeries = async (body:SeriesItemDetails) => {


  try {
    const res = await fetch(`${baseUrl}/series/${body.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add the series");
    }
    return json;
  } catch (error) {
    console.error('Error adding series:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
};

const deleteSeries = async (body:SeriesItemDetails) => {


  try {
    const res = await fetch(`${baseUrl}/series/${body.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add the series");
    }
    return json;
  } catch (error) {
    console.error('Error adding series:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
};







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
export const SeriesService = {
  getSeriesByIdAxios,
  getAllSeries,
  getUserIdByUserName,
  getUserByUserName,
  rateCalculate,
  addSeries,
  updateSeries,
  deleteSeries
  }