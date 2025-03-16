import { useState, useEffect } from "react";
import wordData from "../src/data/words.json";
import wordBg from "./data/wordsBg.json";
import Wordle from "./components/Wordle";

function App() {
   const [solution, setSolution] = useState(null);
   const [words, setWords] = useState(wordData);
   const [isBg, setIsBg] = useState(false);

   useEffect(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
   }, [words]);

   const changeLang = () => {
      setIsBg((prevIsBg) => !prevIsBg);
   };

   useEffect(() => {
      setWords(isBg ? wordBg : wordData);
   }, [isBg]);

   const preventEnterOnButton = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
      }
   };

   return (
      <>
         {console.log(solution)}
         <h1>Wordle</h1>
         <button onClick={changeLang} onKeyDown={preventEnterOnButton}>
            {isBg ? "Change to English" : "Change to Bulgarian"}
         </button>
         {solution && (
            <Wordle solution={solution} words={words} isBg={isBg}></Wordle>
         )}
      </>
   );
}

export default App;
