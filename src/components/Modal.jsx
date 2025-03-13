import React from "react";
import "../css/modal.css";

const Modal = ({ solution, turn, isCorrect }) => {
   return (
      <div className="modal">
         {isCorrect && (
            <div>
               <h1>You win!</h1>
               <p className="solution">{solution}</p>
               <p>You found the solution in {turn} guesses!</p>
            </div>
         )}
         {!isCorrect && (
            <div>
               <h1>You lose</h1>
               <p>The word was:</p>
               <p className="solution"> {solution}</p>
            </div>
         )}
      </div>
   );
};

export default Modal;
