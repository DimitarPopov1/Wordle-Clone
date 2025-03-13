import { useState } from "react";
import { useEffect } from "react";
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
   }, [setSolution]);

   return (
      <>
         <h1>Wordle</h1>

         {solution && <Wordle solution={solution} words={words}></Wordle>}
      </>
   );
}

export default App;
