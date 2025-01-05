import React from "react";
import { RouteObject } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./Login";
import Register from "./Register";
import About from "./About";
import Root from "../layout/root/Root";
import SeriesListDisplay from "./SeriesListDisplay";
import SeriesDetails from "./SeriesDetails";
import Choose from "./Choose";
import { Adding_Screen } from "./Adding_Screen";
import { Add_Series } from "./Adding_Routes/Add_Series";
import { Add_Category } from "./Adding_Routes/Add_Category";
import { Add_Actor } from "./Adding_Routes/Add_Actor";
import { Add_Director } from "./Adding_Routes/Add_Director";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/MainPage",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/seriesList",
        element: <SeriesListDisplay />,
      },
      {
        path: "/seriesDetails",
        element: <SeriesDetails />,
      },
      {
        path:"/Choose",
        element:<Choose/>
      },
      {
        path:"/Adding_Screen",
        element:<Adding_Screen/>
      },
      {
        path:"/Add_Series",
        element:<Add_Series/>
      },
      
      {
        path:"/Add_Category",
        element:<Add_Category/>
      },
      {
        path:"/Add_Actor",
        element:<Add_Actor/>
      },
      
      {
        path:"/Add_Director",
        element:<Add_Director/>
      }
      
      
 
    ],
  },
];