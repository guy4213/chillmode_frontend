import React from 'react';

const About = () => {
  return (
<div className='text-white text-center ml-72 mr-72 text-2xl font-serif space-y-1 flex flex-col mb-8   '>
      <p>ChillMode mission is to display information about all the trending serieses.<br /> 
        allowing users to do exclusive actions that cannot be done in other review websites.  </p>
        <h1 className='text-3xl font-bold font-sans pt-4'> Actions such as:</h1>

      <p className='m-0 p-0 ' >1. <b className='text-sky-500 '>See full series list</b>,seperated by categories.</p>
      <p >2. <b className='text-sky-500'>Search</b> through the list by series name. </p>
      <p >3. <b className='text-sky-500'>Rate</b> each series.</p>
      <p >4. <b className='text-sky-500'>View</b> series details. </p>
      <p >5. <b className='text-sky-500'>Watch</b>  trailer of each series.</p>
      
     
       <h1 className='text-3xl font-bold  font-sans pt-4'>To use this website, you need to:</h1>
          <p>1.<b className='text-violet-300'>Register:</b> enter your userName, Email & Password.</p> 
      <p>2.<b className='text-violet-300'>Login:</b> enter your userName & Password.</p> 
      <p>3.<b className='text-violet-300'>Enjoy: </b> you can do all of the Actions displayed and explained Above. </p> 
      
      
      <div className='text-2xl  font-semibold font-sans space-y-1 flex flex-col justify-between'>
       <h1 className='text-3xl pt-4 font-bold ' >Contact Information:</h1>
          <p>Website Owner And Developer: <span className='font-serif text-indigo-700'>Guy Franses</span></p> 
      <p>Phone Number:<span className='font-serif  text-indigo-700'>+972-534271418</span></p> 
      <p>Email: <span className='font-serif  text-indigo-700'>guy421367@gmail.com</span> </p> 
      </div>


 


    </div>
  );
}

export default About;