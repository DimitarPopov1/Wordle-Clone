import React from "react";
import "../css/modal.css";

const Modal = ({ solution, turn, isCorrect, isBg, resetGame }) => {
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
               <button
                  className="play-again-btn"
                  onClick={() => {
                     resetGame();
                  }}
               >
                  {isBg ? "Играй отново" : "Play Again"}
               </button>
            </div>
         )}
         {!isCorrect && (
            <div>
               <h1>{isBg ? "Загубихте!" : "You lost!"}</h1>
               <p>{isBg ? "Думата беше:" : "The word was:"}</p>
               <p className="solution"> {solution}</p>
               <button
                  className="play-again-btn"
                  onClick={() => {
                     resetGame();
                  }}
               >
                  {isBg ? "Играй отново" : "Play Again"}
               </button>
            </div>
         )}
      </div>
   );
};

export default Modal;
