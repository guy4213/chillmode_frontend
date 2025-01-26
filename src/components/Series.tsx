import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import StarRating from "./star";

function Series(props:any) {
    const [categories, setCategories] = useState(props.categories);
    const [isCategoryExist, setCategoryExist] = useState(false);
    const nav=useNavigate();    
    useEffect(() => {
        // Update categories state whenever props.categories changes
        setCategories(props.categories);
        checkCategoryExistence();
    }, [props.categories]);

    const checkCategoryExistence = () => {
        // Ensure categories is an array before using forEach
        if (Array.isArray(categories)) {
            categories.forEach(category => {
                if (category.name === props.categoryname) {
                    setCategoryExist(true);
                }
            });
        }
    };

function goToDetails(){
    const seriesProps:any= {
       
        id:props.id,
        seriesName: props.seriesName,
        averageRate:props.averageRate,
        img: props.img,
        trailer:props.trailer,
        publishedYear: props.publishedYear,
        numberOfEpisodes: props.numberOfEpisodes,
        seriesDescription: props.seriesDescription,
        categories: props.categories,
        categoryName: props.categoryName, 
        actors: props.actors !== null ? props.actors : "",
        director: props.director !== null ? props.director : "",
     
    };
  console.log(seriesProps.seriesName)
    
    nav("/seriesDetails", { state: seriesProps });
}
    return (
        <div>
            {/* searching,with ignore case by lowercasing both strings */}
            {isCategoryExist && props.seriesName.toLowerCase().includes(props.search.toLowerCase())&& (
                <li className="series">
                    <img
                        onDoubleClick={goToDetails}
                        src={props.img}
                        alt={props.seriesName}
                    />
                    <h2 className="text-lg "><b>{props.seriesName}</b></h2>
                    <div className="text-center text-white">
                        <StarRating 
               key={props.id}
                id={props.id }
               initialRating={props.averageRate}
            fetchData={()=>{}}
            button={true}

                />
         </div>
                </li>
                
            )}
        </div>
    );
}

export default Series;
