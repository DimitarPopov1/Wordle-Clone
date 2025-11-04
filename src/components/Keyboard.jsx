import React, { useEffect, useState } from "react";
import "../css/keyboard.css";

const bulgarianRows = [
  ["я", "в", "е", "р", "т", "ъ", "у", "и", "о", "п", "ш", "щ"],
  ["а", "с", "д", "ф", "г", "х", "й", "к", "л", "ю"],
  ["Enter", "ч", "з", "ь", "ц", "ж", "б", "н", "м", "Backspace"],
];

const englishRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const Keyboard = ({ usedKeys, isBg, onKeyClick, onSubmitGuess }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    setLetters(isBg ? bulgarianRows : englishRows);
  }, [isBg]);

  const handleClick = (key) => {
    if (key === "Enter") onSubmitGuess({ key: "Enter" });
    else if (key === "Backspace") onSubmitGuess({ key: "Backspace" });
    else onKeyClick(key);
  };

  return (
    <div className="keyboard">
      {letters.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const color = usedKeys[key];
            const isLarge = key === "Enter" || key === "Backspace";
            return (
              <div
                key={key}
                className={`key ${isLarge ? "large-key" : ""} ${color || ""}`}
                onClick={() => handleClick(key)}>
                {key === "Backspace" ? "⌫" : key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
