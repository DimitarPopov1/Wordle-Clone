import { useState } from "react";
const useWordle = (solution, words, isBg) => {
   const [turn, setTurn] = useState(0);
   const [currentGuess, setCurrentGuess] = useState("");
   const [guesses, setGuesses] = useState([...Array(6)]);
   const [history, setHistory] = useState([]);
   const [isCorrect, setIsCorrect] = useState(false);
   const [usedKeys, setUsedKeys] = useState({});
   const [miniModal, setMiniModal] = useState(false);
   const [includedWord, setIncludedWord] = useState(false);
   const [turnEnd, setTurnEnd] = useState(false);
   const [notEnoughLetters, setNotEnoughLetters] = useState(false);

   const formatGuess = () => {
      let solutionArray = [...solution];
      let formatedGuess = [...currentGuess].map((letter, index) => {
         return { key: letter, color: "grey" };
      });

      formatedGuess.forEach((letter, index) => {
         if (solutionArray[index] === letter.key) {
            formatedGuess[index].color = "green";
            solutionArray[index] = null;
         }
      });

      formatedGuess.forEach((letter, index) => {
         if (solutionArray.includes(letter.key) && letter.color !== "green") {
            formatedGuess[index].color = "yellow";
            solutionArray[solutionArray.indexOf(letter.key)] = null;
         }
      });

      return formatedGuess;
   };

   const addNewGuess = (formatedGuess) => {
      if (currentGuess === solution) {
         setIsCorrect(true);
      }

      setGuesses((prevGuess) => {
         let newGuesses = [...prevGuess];
         newGuesses[turn] = formatedGuess;
         return newGuesses;
      });

      setHistory((prevHistory) => {
         return [...prevHistory, currentGuess];
      });

      setTurn((prevTurn) => {
         return prevTurn + 1;
      });
      setUsedKeys((prevUsedKeys) => {
         let newKey = { ...prevUsedKeys };
         formatedGuess.forEach((l) => {
            const currentColor = newKey[l.key];
            if (l.color === "green") {
               newKey[l.key] = "green";
               return;
            }
            if (l.color === "yellow" && currentColor !== "green") {
               newKey[l.key] = "yellow";
               return;
            }
            if (
               l.color === "grey" &&
               currentColor !== "green" &&
               currentColor !== "yellow"
            ) {
               newKey[l.key] = "grey";
               return;
            }
         });
         return newKey;
      });
      setCurrentGuess("");
   };

   const handleKey = ({ key }) => {
      if (key === "Enter") {
         if (turn > 5) {
            return;
         }
         if (!words.includes(currentGuess) && currentGuess.length < 5) {
            setNotEnoughLetters(true);
            setTimeout(() => setNotEnoughLetters(false), 1000);
            return;
         }

         if (!words.includes(currentGuess)) {
            setMiniModal(true);
            setTimeout(() => setMiniModal(false), 1000);
            return;
         }
         if (history.includes(currentGuess)) {
            setIncludedWord(true);
            setTimeout(() => setIncludedWord(false), 1000);
            return;
         }

         const formatted = formatGuess();
         addNewGuess(formatted);
      }

      if (key === "Backspace") {
         setCurrentGuess((prev) => prev.slice(0, -1));
         return;
      }

      const letterRegex = isBg
         ? /^[\u0410-\u042F\u0430-\u044F]$/ // Bulgarian alphabet
         : /^[A-Za-z]$/; // English alphabet

      if (letterRegex.test(key)) {
         if (currentGuess.length < 5) {
            setCurrentGuess((prev) => prev + key);
         }
      }
   };

   return {
      turn,
      currentGuess,
      guesses,
      isCorrect,
      usedKeys,
      handleKey,
      miniModal,
      includedWord,
      turnEnd,
      setCurrentGuess,
      notEnoughLetters,
   };
};
export default useWordle;
