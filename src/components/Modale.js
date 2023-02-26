import React, { useState } from "react";
import "../styles/modal.scss";

const Modal = (props) => {
  const [leTexte, setText] = useState("");

  const changement = (e) => {
    setText(e.target.value);
    // console.log("item modal ", props.lequel, "   texte  ", leTexte);
  };

  //*** on n'affiche pas la modal */
  if (props.show === "false") {
    return null;
  }

  //*********                   */
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-tittle"> Modal titre</h4>
        </div>

        <div className="modal-body">
          {" "}
          Type de dépense
          <input
            type="text"
            className="input-text"
            id="in-text"
            defaultValue={props.leQuel}
            onInput={changement}
          />
        </div>
        <div className="modal-footer">
          <button className="button-annuler" onClick={props.onClose}>
            Annuler
          </button>
          <button
            type="submit"
            className="button-valid"
            onClick={() => {
              const x = document.getElementById("in-text").value;
              // console.log(" x = ", x);

              setText("");
              document.getElementById("in-text").value = "";
              props.onValid(x);
            }}
          >
            {leTexte !== "" ? "Valider" : "Modifier"}
          </button>
          <button
            className="button-delete"
            onClick={() => {
              const x = document.getElementById("in-text").value;
              console.log(" delete  = ", x);
              props.onDelete(x);
            }}
          >
            Supprimer
          </button>
          <button
            className="button-ajouter"
            onClick={() => {
              const x = document.getElementById("in-text").value;
              console.log(" ajouter  = ", x);
              props.onNewDonnees(x);
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
