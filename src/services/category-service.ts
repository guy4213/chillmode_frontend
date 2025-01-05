import {  request } from "./axios-helper";
import { baseUrl } from "./auth-service";
import axios from "axios";
import { Category, SeriesItem, SeriesItemDetails } from "../@types/types";



// base url=http://127.0.0.1:8084/api/v1
const getAllCategories=async()=>{

  const res= await  request({url:`/categories`});
  
  console.log(res.data)
  return res.data;
  
  }


const addCategory = async (body:Category) => {
  // Check if the required field `seriesName` is present and not null
  try {
    const res = await fetch(`${baseUrl}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add the Category");
    }
    return json;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
};

const addCategoriesToASeries=async(data:any)=>{
  try {
    const res = await fetch( `${baseUrl}/series/addCategoriesByNames?SeriesId=${data.seriesId}&categoryNames=${data.categories}`, {
      method: "POST",
     
      
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add the categories");
    }
    return json;
  } catch (error) {
    console.error('Error adding categories:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
}

const updateCategory=async(data:any)=>{
  try {
    const res = await axios.put( `${baseUrl}/categories/${data.id}`,data);

    const json = res.data

    if (!res.data) {
      throw new Error(json.message || "Failed to add the categories");
    }
    return json;
  } catch (error) {
    console.error('Error adding categories:', error);
    throw error; // Rethrow to handle it in calling function or to display to the user
  }
}

const deleteCategory  =async(data:any)=>{


try {
  const res = await fetch(`${baseUrl}/categories/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
export const CategoryService = {
getAllCategories,
addCategory,
addCategoriesToASeries,
updateCategory,
deleteCategory
  }