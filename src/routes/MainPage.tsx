import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "../components/Button";


function MainPage() {

  const nav = useNavigate();

 
  return (<div className="MainPage">
<button type="button" onClick={()=>nav("/register")} > <Button class="return" text="Register" /> </button>
<div className="text-orange-600 pt-0"> already have an account? </div>
<button type="button" className="pt-10" onClick={()=>nav("/login")}> <Button class="return" text="Login" /> </button>
  </div>
  
  );
}

export default MainPage;