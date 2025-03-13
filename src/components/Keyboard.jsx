import React, { useEffect, useState } from "react";
import "../css/keyboard.css";

const alphabetBg = [
   { key: "а" },
   { key: "б" },
   { key: "в" },
   { key: "г" },
   { key: "д" },
   { key: "е" },
   { key: "ж" },
   { key: "з" },
   { key: "и" },
   { key: "й" },
   { key: "к" },
   { key: "л" },
   { key: "м" },
   { key: "н" },
   { key: "о" },
   { key: "п" },
   { key: "р" },
   { key: "с" },
   { key: "т" },
   { key: "у" },
   { key: "ф" },
   { key: "х" },
   { key: "ц" },
   { key: "ч" },
   { key: "ш" },
   { key: "щ" },
   { key: "ъ" },
   { key: "ь" },
   { key: "ю" },
   { key: "я" },
];
const alphabetKeyboard = [
   { key: "q" },
   { key: "w" },
   { key: "e" },
   { key: "r" },
   { key: "t" },
   { key: "y" },
   { key: "u" },
   { key: "i" },
   { key: "o" },
   { key: "p" },

   { key: "a" },
   { key: "s" },
   { key: "d" },
   { key: "f" },
   { key: "g" },
   { key: "h" },
   { key: "j" },
   { key: "k" },
   { key: "l" },

   { key: "z" },
   { key: "x" },
   { key: "c" },
   { key: "v" },
   { key: "b" },
   { key: "n" },
   { key: "m" },
];
const Keyboard = ({ usedKeys }) => {
   const [letters, setLetters] = useState(null);

   useEffect(() => {
      setLetters(alphabetKeyboard);
   }, []);
   return (
      <div className="keyboard">
         {letters &&
            letters.map((l) => {
               const color = usedKeys[l.key];
               return (
                  <div key={l.key} className={color}>
                     {l.key}
                  </div>
               );
            })}
      </div>
   );
};

export default Keyboard;
