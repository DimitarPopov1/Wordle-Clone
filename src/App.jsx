import { useState, useEffect } from "react";
import wordData from "../src/data/words.json";
import wordBg from "./data/wordsBg.json";
import Wordle from "./components/Wordle";
import HelpModal from "./components/HelpModal";
import UserStats from "./components/UserStats";
import Leaderboard from "./components/Leaderboard";
import "./css/app.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

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
      <SignedOut>
        <div className="signed-out">
          <h1 className="signed-out-header">Welcome to Wordle!</h1>
          <SignInButton mode="modal">
            <button className="sign-in-button">Sign In to Play</button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        {console.log(solution)}
        <UserButton afterSignOutUrl="/" />
        <Leaderboard />
        <h1>Wordle</h1>
        <HelpModal setIsBg={setIsBg} isBg={isBg}></HelpModal>
        {solution && (
          <Wordle
            key={solution}
            solution={solution}
            words={words}
            isBg={isBg}
            resetGame={resetGame}></Wordle>
        )}
        <UserStats />
      </SignedIn>
    </>
  );
}

export default App;
