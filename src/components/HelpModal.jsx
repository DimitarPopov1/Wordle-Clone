import React, { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import "../css/minimodal.css";

const Modal = ({ onClose, isBg }) => {
  return (
    <div className="minimodal" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>

          {isBg ? (
            <>
              <p className="title">Познайте думата от 6 опита.</p>
              <p>Всеки опит трябва да е валидна 5-буквена дума.</p>
              <p>
                След всеки опит цветовете на клетките ще се променят, за да
                покажат колко сте близо до правилната дума.
              </p>
              <hr />
              <p className="subtitle">Примери:</p>

              <div className="example">
                <div className="letter correct">П</div>
                <div className="letter">Е</div>
                <div className="letter">С</div>
                <div className="letter">Е</div>
                <div className="letter">Н</div>
              </div>
              <p>Буквата П присъства и е на правилното място.</p>

              <div className="example">
                <div className="letter">Б</div>
                <div className="letter present">У</div>
                <div className="letter">Х</div>
                <div className="letter">А</div>
                <div className="letter">Л</div>
              </div>
              <p>Буквата У присъства, но е на грешно място.</p>

              <div className="example">
                <div className="letter">Д</div>
                <div className="letter">И</div>
                <div className="letter">В</div>
                <div className="letter absent">А</div>
                <div className="letter">Н</div>
              </div>
              <p>Буквата А не присъства в отговора.</p>
            </>
          ) : (
            <>
              <p className="title">Guess the word in 6 tries.</p>
              <p>Each guess must be a valid 5-letter word.</p>
              <p>
                After each guess, the color of the tiles will change to show how
                close your guess was to the correct word.
              </p>
              <hr />
              <p className="subtitle">Examples:</p>

              <div className="example">
                <div className="letter correct">W</div>
                <div className="letter">O</div>
                <div className="letter">R</div>
                <div className="letter">D</div>
                <div className="letter">S</div>
              </div>
              <p>The letter W is in the word and in the correct spot.</p>

              <div className="example">
                <div className="letter">C</div>
                <div className="letter present">A</div>
                <div className="letter">R</div>
                <div className="letter">E</div>
                <div className="letter">S</div>
              </div>
              <p>The letter A is in the word but in the wrong spot.</p>

              <div className="example">
                <div className="letter">P</div>
                <div className="letter">L</div>
                <div className="letter absent">A</div>
                <div className="letter">N</div>
                <div className="letter">E</div>
              </div>
              <p>The letter A is not in the word at all.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const HelpModal = ({ setIsBg, isBg }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const preventEnterOnButton = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const changeLang = () => setIsBg((prevIsBg) => !prevIsBg);

  return (
    <>
      <div className="container-top">
        <div className="rules-container">
          <span>{isBg ? "Правила на играта" : "Rules of the game"}</span>
          <FaRegQuestionCircle className="QuestionMark" onClick={toggleModal} />
        </div>

        {showModal && <Modal onClose={toggleModal} isBg={isBg} />}

        <button
          className="LanguageBtn"
          onClick={changeLang}
          onKeyDown={preventEnterOnButton}>
          {isBg ? "Change to English" : "Change to Bulgarian"}
        </button>
      </div>
    </>
  );
};

export default HelpModal;
