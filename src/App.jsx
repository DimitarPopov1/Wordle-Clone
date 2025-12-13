import { useState, useEffect } from "react";
import wordData from "../src/data/words.json";
import wordBg from "./data/wordsBg.json";
import Wordle from "./components/Wordle";
import HelpModal from "./components/HelpModal";
import UserStats from "./components/UserStats";
import Leaderboard from "./components/Leaderboard";
import logo from "../src/assets/wordle-logo.svg";
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
        {/* Full-width Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              {<img src={logo} alt="Wordle Logo" className="app-logo" />}
            </h1>
            <div className="header-right">
              <HelpModal setIsBg={setIsBg} isBg={isBg} />
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "50px",
                      height: "50px",
                    },
                  },
                }}
              />
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="top-stats">
            <Leaderboard />
            <UserStats />
          </div>

          {solution && (
            <Wordle
              key={solution}
              solution={solution}
              words={words}
              isBg={isBg}
              resetGame={resetGame}
            />
          )}
        </main>
      </SignedIn>
    </>
  );
}

export default App;
