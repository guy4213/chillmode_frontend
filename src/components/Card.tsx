import React from "react";
import type { FC } from "../@types/types";

export const Card: FC = (props) => {
  return (
    <div className="bg-white w-fit border-red-100 border p-5 pb-0 pt-0 text-slate-600 text-xs shadow-2xl rounded-lg mt-10 w-1/5">
      {props.children}
    </div>
  );
};
