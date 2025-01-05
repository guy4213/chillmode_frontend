import { ReactNode, useState } from "react";
//reference to series types
export type FC = (props: { children: ReactNode }) => ReactNode;



export interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}

export type SeriesPage = {
  totalSerieses: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  series: Array<SeriesItem>;
};

export type SeriesItem = {
   id:number;
   img:string;
   averageRate:number;
   trailer:string
   seriesName:string;
   publishedYear:number;
   numberOfEpisodes:number;
   seriesDescription:string;
  //1. categories to series many to Many
   categories:Array<Category>;
   actors: Array<Actor> ;
   director:Director;
};

 export type Category ={
  id: number;
  name:String;
  description:string;
 }
 type Actor = {
  id: number;
  actorName: string;
  description: string;
  price:number;
};
export type Kitchen_Kind = {
  id: number;
  actorName: string;
  city: string;
  country:string;
  role:string;
};

export type Director={
  id: number;
  directorName: string;
  city: string;
  country:string;
 
}
export type User = {
  id: number;
  username: string;
  email: string;
  roles: Array<Role> ;
};

export type SeriesItemDetails = {
  id:number;
  seriesName: string;
  trailer:String;
  averageRate:number;
  img: string;
  publishedYear: string;
  numberOfEpisodes:  number;
  seriesDescription:string;
  categories: Array<Category>;
  categoryName: string; // Corrected from categoryname to categoryName
  actors: Array<Actor>;
  director:Director;
};


export type Role = {
  id: number;
  name: string;

};