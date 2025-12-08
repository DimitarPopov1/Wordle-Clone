import React from "react";
import "../css/modal.css";
import BgWordsDescriptions from "../data/BgWordsDescriptions.json";

const Modal = ({ solution, turn, isCorrect, isBg, resetGame }) => {
  const description = isBg
    ? BgWordsDescriptions[solution] || "Описанието скоро ще бъде добавено."
    : null;

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>{isBg ? "Победа!" : "You win!"}</h1>
          <p className="solution">{solution}</p>
          {isBg && <div className="description">{description}</div>}
          <p>
            {isBg
              ? `Намерихте решението в ${turn} ${turn === 1 ? "ход" : "хода"} !`
              : `You found the solution in ${turn} ${
                  turn === 1 ? "guess" : "guesses"
                } !`}
          </p>
          <button
            className="play-again-btn"
            onClick={() => {
              resetGame();
            }}>
            {isBg ? "Играй отново" : "Play Again"}
          </button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>{isBg ? "Загубихте!" : "You lost!"}</h1>
          <p>{isBg ? "Думата беше:" : "The word was:"}</p>
          <p className="solution"> {solution}</p>
          {isBg && <div className="description">{description}</div>}
          <button
            className="play-again-btn"
            onClick={() => {
              resetGame();
            }}>
            {isBg ? "Играй отново" : "Play Again"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
