import React from "react";
import "../css/minimodal.css";

const MiniModal = ({ isBg }) => {
   return (
      <>
         <div className="minimodal">
            <h2>{!isBg ? "Word Not Found!" : "Думата не е в речника!"}</h2>
         </div>
      </>
   );
};

export default MiniModal;
