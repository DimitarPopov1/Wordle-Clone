import { useState, useEffect } from "react";
import wordData from "../src/data/words.json";
import wordBg from "./data/wordsBg.json";
import Wordle from "./components/Wordle";
import HelpModal from "./components/HelpModal";

function App() {
   const [solution, setSolution] = useState(null);
   const [words, setWords] = useState(wordData);
   const [isBg, setIsBg] = useState(false);

   useEffect(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
   }, [words]);

   useEffect(() => {
      setWords(isBg ? wordBg : wordData);
   }, [isBg]);

   const resetGame = () => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
   };

   return (
      <>
         {console.log(solution)}
         <h1>Wordle</h1>
         <HelpModal setIsBg={setIsBg} isBg={isBg}></HelpModal>
         {solution && (
            <Wordle
               key={solution}
               solution={solution}
               words={words}
               isBg={isBg}
               resetGame={resetGame}
            ></Wordle>
         )}
      </>
   );
}

export default App;
