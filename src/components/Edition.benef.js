import React from "react";
import "../styles/edition-benef.scss";

const Edition = ({ depense, id }) => {
  return (
    <div className="edition-container">
      <h3> Edition</h3>
      <input type="text" defaultValue={depense} />
      <button type="submit" value="valider">Valider</button>
    </div>
  );
};

export default Edition;
