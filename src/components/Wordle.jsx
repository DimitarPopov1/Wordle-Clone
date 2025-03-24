import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import MiniModal from "./MiniModal";
import IncludedModal from "./IncludedModal";

const Wordle = ({ solution, words, isBg }) => {
   const {
      currentGuess,
      handleKey,
      guesses,
      isCorrect,
      usedKeys,
      turn,
      miniModal,
      includedWord,
      setCurrentGuess,
   } = useWordle(solution, words, isBg);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      window.addEventListener("keyup", handleKey);
      if (isCorrect) {
         setTimeout(() => setShowModal(true), 1000);
         window.removeEventListener("keyup", handleKey);
      }
      if (turn > 5) {
         setTimeout(() => setShowModal(true));
         window.removeEventListener("keyup", handleKey);
      }

      return () => window.removeEventListener("keyup", handleKey);
   }, [handleKey, isCorrect, turn]);

   const handleKeyClick = (key) => {
      if (currentGuess.length < 5) {
         setCurrentGuess((prev) => prev + key);
      }
   };

   return (
      <>
         <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}></Grid>
         <Keyboard
            usedKeys={usedKeys}
            isBg={isBg}
            onKeyClick={handleKeyClick}
            onSubmitGuess={handleKey}
         ></Keyboard>
         {showModal && (
            <Modal
               isCorrect={isCorrect}
               turn={turn}
               solution={solution}
            ></Modal>
         )}
         {miniModal && <MiniModal />}
         {includedWord && <IncludedModal></IncludedModal>}
      </>
   );
};

export default Wordle;
