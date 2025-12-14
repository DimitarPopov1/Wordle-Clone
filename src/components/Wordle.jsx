import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import MiniModal from "./MiniModal";
import IncludedModal from "./IncludedModal";
import ShortModal from "./ShortModal";
import { useUser } from "@clerk/clerk-react";
import { saveGameResult } from "../hooks/saveGame";
import { useRef } from "react";

const Wordle = ({ solution, words, isBg, resetGame }) => {
  const {
    currentGuess,
    handleKey,
    guesses,
    isCorrect,
    usedKeys,
    turn,
    miniModal,
    includedWord,
    notEnoughLetters,
    setCurrentGuess,
  } = useWordle(solution, words, isBg);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  const didSave = useRef(false);
  useEffect(() => {
    window.addEventListener("keyup", handleKey);

    if ((isCorrect || turn > 5) && !didSave.current) {
      didSave.current = true; // prevent double-save
      setTimeout(() => setShowModal(true), 1000);
      window.removeEventListener("keyup", handleKey);

      saveGameResult(user, { solution, isCorrect, turn });
    }

    return () => window.removeEventListener("keyup", handleKey);
  }, [handleKey, isCorrect, turn]);

  const handleKeyClick = (key) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const handlePlayAgain = () => {
    resetGame(); // Reset the game to a new word
    setShowModal(false); // Close the modal
  };

  return (
    <>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}></Grid>
      <Keyboard
        usedKeys={usedKeys}
        isBg={isBg}
        onKeyClick={handleKeyClick}
        onSubmitGuess={handleKey}></Keyboard>
      {showModal && (
        <Modal
          isBg={isBg}
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          resetGame={handlePlayAgain}></Modal>
      )}
      {miniModal && <MiniModal isBg={isBg} />}
      {includedWord && <IncludedModal isBg={isBg}></IncludedModal>}
      {notEnoughLetters && <ShortModal isBg={isBg}></ShortModal>}
    </>
  );
};

export default Wordle;
