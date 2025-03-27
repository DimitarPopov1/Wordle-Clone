import React from "react";
import "../css/minimodal.css";

const IncludedModal = ({ isBg }) => {
   return (
      <>
         <div className="minimodal">
            <h2>
               {!isBg ? "Word already guessed!" : "Думата вече е пробвана"}
            </h2>
         </div>
      </>
   );
};

export default IncludedModal;
