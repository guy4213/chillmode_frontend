import {  request } from "./axios-helper";
import { baseUrl } from "./auth-service";
import axios from "axios";
import { Category, SeriesItem, SeriesItemDetails } from "../@types/types";



// base url=http://127.0.0.1:8084/api/v1

const addActor = async (body:Category) => {
  // Check if the required field `seriesName` is present and not null
  try {
    const res = await fetch(`${baseUrl}/actors`, {
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
    console.error('Error adding Actor:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
};
const addActorsToASeries=async(data:any)=>{
  try {
    // if(parseInt(data.seriesId)==Number(data.seriesId)){console.log(data.seriesId)}
    // else if(parseInt(data.seriesId)!=Number(data.seriesId)){console.log(data.seriesId +" isnt a number! its a string!")}
    const res = await fetch( `${baseUrl}/series/addActorsByNames?SeriesId=${data.seriesId}&ActorNames=${data.actorNames}`, {
      method: "POST",
   
    
    });
  
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Failed to add the categories");
    }
    return json;
  } catch (error) {
    console.error('Error adding Actors:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
}
const updateActor = async (data:any) => {
  // Check if the required field `seriesName` is present and not null
  try {
    const res = await fetch( `${baseUrl}/actors/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Failed to update the Actor");
    }
    return json;
  } catch (error) {
    console.error('Error update Actor:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
};
const deleteActor = async (data:any) => {
  try {
    const res = await fetch(`${baseUrl}/actors/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Failed to delete the Actor");
    }
    return json;
  } catch (error) {
    console.error('Error delete Actor:', error);
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
export const ActorService = {
  
  addActor,
  addActorsToASeries,
  updateActor,
  deleteActor,
  }