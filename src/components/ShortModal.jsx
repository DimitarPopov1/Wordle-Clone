import React from "react";
import "../css/minimodal.css";
const ShortModal = ({ isBg }) => {
   return (
      <div className="minimodal">
         <h2>{!isBg ? "Not Enough Letters!" : "Няма достатъчно букви!"}</h2>
      </div>
   );
};

export default ShortModal;
