import React, { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import "../css/minimodal.css";

const Modal = ({ onClose }) => {
   return (
      <div className="minimodal" onClick={onClose}>
         <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
               <button className="close-btn" onClick={onClose}>
                  ×
               </button>
               <p className="title">Познайте думата от 6 опита.</p>
               <p>Всеки опит трябва да е валидна 5-буквена дума.</p>
               <p>
                  След всеки опит цветовете на клетките ще се променят за да
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
               <p>Буквата У присъства но е на грешно място.</p>
               <div className="example">
                  <div className="letter">Д</div>
                  <div className="letter">И</div>
                  <div className="letter">В</div>
                  <div className="letter absent">А</div>
                  <div className="letter">Н</div>
               </div>
               <p>Буквата А не присъства в отговора.</p>
            </div>
         </div>
      </div>
   );
};

const HelpModal = ({ setIsBg, isBg }) => {
   const [showModal, setShowModal] = useState(false);

   const toggleModal = () => {
      setShowModal(!showModal);
   };

   const preventEnterOnButton = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
      }
   };
   const changeLang = () => {
      setIsBg((prevIsBg) => !prevIsBg);
   };

   return (
      <>
         <div className="container-top">
            <FaRegQuestionCircle
               className="QuestionMark"
               onClick={toggleModal}
            />
            {showModal && <Modal onClose={toggleModal} />}
            <button
               className="LanguageBtn"
               onClick={() => {
                  changeLang();
               }}
               onKeyDown={preventEnterOnButton}
            >
               {isBg ? "Change to English" : "Change to Bulgarian"}
            </button>
         </div>
      </>
   );
};

export default HelpModal;
