import React from "react"
import "./Button.scss"
export const Button = (props:any) => {
  return (
    <div className={props.class}><button className="text" >
    

    {props.text}
</button></div>
  )
}
