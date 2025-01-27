import { useState } from 'react';
import React from 'react';

const StarRating: React.FC<{ id:number, initialRating: number , button:boolean,  updateRate?: () => void; }>
 = ({ id, button, initialRating, updateRate }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
    localStorage.setItem("rating", newRating.toString());
  };

  const submitRate = async (event: React.FormEvent) => {
    event.preventDefault(); // Preven
    if (updateRate !== undefined) {
      updateRate(); 
    }
  };

  return (
    <div className=' mt-0'>
      {[...Array(10)].map((_, index) => {
        const starValue = index + 1;
        let starColor = 'gray';
        if (starValue <= rating) {
          starColor = 'gold';
        } else if (starValue - 0.5 <= rating) {
          starColor = 'gold';
        }

        return (
          button ? (
            <span
              key={index}
              onClick={() => handleStarClick(starValue)}
              style={{
                cursor: 'pointer',
                color: starColor,
              }}
            >
              &#9733; {/* Star Unicode */}
            </span>
          ) : (
            <span
              key={index}
              style={{
                cursor: 'pointer',
                color: starColor,
              }}
            >
              {starValue <= rating ? '★' : starValue - 0.5 <= rating ? '☆' : '☆'} {/* Star Unicode */}
            </span>
          )
        );
      })}
      <form onSubmit={(event: React.FormEvent)=>submitRate(event)}>
    {  button 
        ?(
         <p className=' mb-0'>rating: {rating} / 10</p>
         )
        :(
          <p className=' mb-0'>average rate: {rating.toFixed(2)} / 10</p>
         )}
        <br />
        {button && (
          <button className='bg-green-600 text-stone-50 border-none rounded-xl p-2 ml-2'>
            submit rate
          </button>
        )}
      </form>
    </div>
  );
};

export default StarRating;