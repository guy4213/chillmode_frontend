import React from "react";
import IconArrowDown from "../Icons/IconArrowDown"
import './SlideButton.scss'

const SlideButton = ({ onClick, type }:any) => (
  <button className={`slide-button slide-button--${type}`} onClick={onClick}>
    <span>
      <IconArrowDown />
    </span>
  </button>
);

export default SlideButton;