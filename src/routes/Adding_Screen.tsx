import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Adding_Screen = () => {
    const nav=useNavigate();
  return (
    <div className='text-center p-2'>

    <div className='text-center p-1'>
<button onClick={() => nav("/Add_Series")}>
    <Button class="return" text="Add Series" />
  </button></div>

  <div className='text-center p-1'>
   <button onClick={() => nav("/Add_Category")}>
   <Button class="return" text="Add Category" />
 </button> </div>

 <div className='text-center p-1'>
<button onClick={() => nav("/Add_Actor")}>
    <Button class="return" text="Add Actor" />
  </button></div>

  <div className='text-center p-1'>
   <button onClick={() => nav("/Add_Director")}>
   <Button class="return" text="Add Director" />
 </button> </div>
 
 <div className='text-center p-1'>
   <button onClick={() => nav("/Choose")}>
   <Button class="return" text="Return" />
 </button> </div>
 </div>
  )
}
