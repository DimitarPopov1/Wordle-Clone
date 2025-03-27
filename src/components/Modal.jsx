import React from "react";
import "../css/modal.css";

const Modal = ({ solution, turn, isCorrect, isBg }) => {
   return (
      <div className="modal">
         {isCorrect && (
            <div>
               <h1>{isBg ? "Победа!" : "You win!"}</h1>
               <p className="solution">{solution}</p>
               <p>
                  {isBg
                     ? `Намерихте решението в ${turn} хода!`
                     : `You found the solution in ${turn} guesses!`}
               </p>
            </div>
         )}
         {!isCorrect && (
            <div>
               <h1>{isBg ? "Загубихте!" : "You lost!"}</h1>
               <p>{isBg ? "Думата беше:" : "The word was:"}</p>
               <p className="solution"> {solution}</p>
            </div>
         )}
      </div>
   );
};

export default Modal;
