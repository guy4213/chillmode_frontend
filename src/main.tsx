import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "../src/routes/Index";
import { AuthContextProvider } from "./contexts/AuthContext";
import './index.css';
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppStateProvider } from "./AppState";
const router = createBrowserRouter(routes);

const div = document.getElementById("root")!;
ReactDOM.createRoot(div).render(
  
  <AuthContextProvider>
    <AppStateProvider>
  <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
      </AppStateProvider>
      </AuthContextProvider>
      
 
);