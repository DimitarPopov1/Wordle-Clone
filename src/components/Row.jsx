import React from "react";
import "../css/row.css";

const Row = ({ guess, currentGuess }) => {
   if (guess && guess.length) {
      return (
         <div className="row past">
            {guess.map((l, i) => (
               <div key={i} className={l.color}>
                  {l.key}
               </div>
            ))}
         </div>
      );
   }

   if (currentGuess) {
      let letters = currentGuess.split("");
      const remainingSpaces = 5 - letters.length;
      if (remainingSpaces < 0) {
         // Prevent invalid array length
         letters = letters.slice(0, 5); // Trim it to 5 characters
      }
      return (
         <div className="row">
            {letters.map((letter, index) => {
               return (
                  <div key={index} className="filled">
                     {letter}
                  </div>
               );
            })}
            {[...Array(Math.max(0, remainingSpaces))].map((value, index) => (
               <div key={index}></div>
            ))}
         </div>
      );
   }

   return (
      <div className="row">
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   );
};

export default Row;
