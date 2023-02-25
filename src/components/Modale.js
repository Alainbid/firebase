import React, { useState } from "react";
import "../styles/modal.scss";

const Modal = (props) => {
  const [leTexte, setText] = useState("");
  const changement = (e) => {
    setText(e.target.value);
    props.okChange(leTexte);
  };

  //*** on n'affiche pas la modal */
  if (!props.show) {
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
            onChange={changement}
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
              props.okChange(leTexte);
              props.onValid();
            }}
          >
            {leTexte !== "" ? "Valider" : "Modifier"}
          </button>
          <button className="button-delete" onClick={props.onDelete}>
            Supprimer
          </button>
          <button className="button-ajouter" onClick={props.onNewData}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
