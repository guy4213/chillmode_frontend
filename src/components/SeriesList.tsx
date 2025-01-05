import  { useState, useEffect, useRef } from 'react';
import React from 'react';
import Series from './Series';
import SlideButton from './SlideButton';
import { SeriesPage } from '../@types/types';
import { SeriesService } from '../services/series-service';
import { useLocation } from 'react-router-dom';


const SeriesList = (props:any) => {
    const [seriesPage, setSeriesPage] = useState<SeriesPage>();
    const containerRef = useRef<HTMLUListElement | null>(null);
    const [itemsPerPage, setitemsPerPage] = useState(0);
    const location = useLocation();

   
  
  useEffect(() => {
    
    updateSeriesPerPage();
    window.addEventListener('resize', updateSeriesPerPage);


    return () => {
      window.removeEventListener('resize', updateSeriesPerPage);
    };
  }, []);
  useEffect(() => {
    // Check if the search prop is empty or if the current pathname is "/seriesList"
    if ( location.pathname === "/seriesList") {
      fetchData();
      console.log(props.search);
    }
  }, [location.pathname]); 
  

  useEffect(() => {
    updateSeriesPerPage();
  }, [seriesPage]);

  const fetchData = async () => {
    try {
      const seriesResponse = await SeriesService.getAllSeries()
      setSeriesPage(seriesResponse);
     
     
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const updateSeriesPerPage = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      console.log(containerWidth)
      console.log(seriesPage)
    
      const seriesItemWidth = 300; // Assuming each series item has a fixed width of 300px
      const newSeriesPerPage = Math.floor(containerWidth / seriesItemWidth);
      setitemsPerPage(newSeriesPerPage);
    }
  };

  const handleScroll = (scrollOffset:any) => {
  
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
   
  };

    

 

  return (
  <>

    {seriesPage?.series.length!! >= 0 &&   (
      <div className={`series-list-container ${props.position}`}>
        <h1 className='text-right pr-16   text-blue-500 font-bold text-4xl rounded-full p-2 shadow-xl'>
          {props.categoryName}
        </h1>
        <ul className="seriesList" ref={containerRef}>
          <SlideButton onClick={() => handleScroll(-320 * itemsPerPage)} type="prev" />
          {Array.isArray(seriesPage?.series) ? (
            seriesPage?.series.map(seriesItem=> (
               <Series
                search={props.search}
                key={seriesItem.id}
                id={seriesItem.id}
                averageRate={seriesItem.averageRate}
                seriesName ={seriesItem.seriesName}
                trailer={seriesItem.trailer}
                img={seriesItem.img}
                publishedYear={seriesItem.publishedYear}
                numberOfEpisodes={seriesItem.numberOfEpisodes}
                seriesDescription={seriesItem.seriesDescription}
                categories={seriesItem.categories}
                categoryname={props.categoryName}
                actors={seriesItem.actors!==null ?seriesItem.actors:""}
                director={seriesItem.director!==null ?seriesItem.director:""}
                SeriesDetails={props.seriesDetailScreen}
              />
            ))
          ) : (
            <p>Data is not in the expected format.</p>
          )}
          <SlideButton onClick={() => handleScroll(320 * itemsPerPage)} type="next" />
        </ul>
      </div>
    )}
  </>
);

          }
export default SeriesList;

