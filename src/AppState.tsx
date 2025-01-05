import React, { createContext, useContext, useEffect, useState } from 'react';
import { SeriesItemDetails } from './@types/types';

const AppStateContext = createContext<{
  Name: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  seriesDetails: SeriesItemDetails | null; // Correctly type seriesDetails
  setSeriesDetails: React.Dispatch<React.SetStateAction<SeriesItemDetails | null>>; 
  storedName:string;
  // Correctly type setSeriesDetails
} | null>(null);

export const useAppState = () => useContext(AppStateContext)!;

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize Name state from localStorage or set it to an empty string if it doesn't exist
  const storedName = localStorage.getItem('Name') || '';
  const [Name, setUserName] = useState(storedName);
  // Retrieve seriesDetails from localStorage or set it to null if it doesn't exist
  const storedSeries = localStorage.getItem('seriesDetails');
  const [seriesDetails, setSeriesDetails] = useState<SeriesItemDetails | null>(null);
  useEffect(() => {
    // Update local storage whenever the Name state changes
    localStorage.setItem('Name', Name);
  }, [Name]); // This effect will trigger whenever Name changes

  useEffect(() => {
    // Update local storage whenever the seriesDetails state changes
    localStorage.setItem('seriesDetails', JSON.stringify(seriesDetails));
  }, [seriesDetails]); // This effect will trigger whenever seriesDetails changes

  // Create context value object
  const value = { seriesDetails, setSeriesDetails, Name, setUserName,storedName };

  return (
    // Provide context value to children components
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};