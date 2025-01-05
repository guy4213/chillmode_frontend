import  { useContext, useEffect, useState } from 'react'
import SeriesList from '../components/SeriesList';
import { Category, SeriesItem, SeriesPage } from '../@types/types';
import { AuthContext } from '../contexts/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { useAppState } from '../AppState';
import { Button } from '../components/Button';
import { CategoryService } from '../services/category-service';
import React from "react";
import { SeriesService } from '../services/series-service';

const SeriesListDisplay = () => {
    const [categoryArray,setCategoryArray]=useState<Array<Category>>([]);
    const { isLoggedIn, logout } = useContext(AuthContext);
  const nav=useNavigate();
  
  const [searchVal,setSearchVal]=useState('');
  const categories2DArray: any[][] = [];
  const categories: Set<String> = new Set();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const seriesRes = await SeriesService.getAllSeries() as SeriesPage;

            // Populate the 2D array with categories
            seriesRes.series.forEach(seriesItem => {
                categories2DArray.push(seriesItem.categories);
            });

            // Extract unique category names from the 2D array
            categories2DArray.forEach(categoryArray => {
                categoryArray.forEach(category => {
                    categories.add(category.name);
                });
            });

            // Convert the Set to an Array if needed
            const uniqueCategoriesArray = Array.from(categories);
            console.log(uniqueCategoriesArray); // This will log the array of unique category names
              
            const categoriesResponse = await CategoryService.getAllCategories() as Array<Category>;
            categoriesResponse.forEach(categoryItem=>{
              if (uniqueCategoriesArray.includes(categoryItem.name)) {
                setCategoryArray(prev => [...prev, categoryItem]);  
              }
            })
           
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    
      function executeLogOut(){
        
        logout()
         nav("/MainPage")
      }



      async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setSearchVal(value)
        console.log(searchVal)
     
        console.log(value);
      }

  return (<div>
<div className="flex justify-center pt-4 w-full">
      <input className=' text-center  ' type="text" placeholder='search a series' value={searchVal} onChange={handleChange} />
</div>
    
    {categoryArray.map(categoryItem=> <SeriesList search={searchVal} key={categoryItem.id}
        categoryName={categoryItem.name} position="first-list"
         />)}
          { isLoggedIn && <button  onClick={executeLogOut} ><Button  class="logout" text="Log Out"  /></button>}
          <div className='text-center '>
   <button onClick={() => nav("/Choose")}>
   <Button class="return" text="back to Choose Screen" />
     </button> </div>
        </div>
  )
}

export default SeriesListDisplay