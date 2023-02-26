import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/depenses.scss";
import { db } from "./FirebaseConfig";
import Modal from "../components/Modale";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const SnapshotDepenses = () => {
  const [depenses, setDepenses] = useState([]);
  const depensesCollectionRef = collection(db, "depenses");
  const [natureDepenses, setNatureDepenses] = useState("");
  const [showModal, setShowModal] = useState("false");
  const [idItem, setIdItem] = useState("");

  useEffect(() => {
    const getDepenses = async () => {
      const data = await getDocs(
        query(depensesCollectionRef, orderBy("nature"))
      );
      setDepenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDepenses();
  }, [depensesCollectionRef]);

  //**********  MODIFIER ********** */
  const modifier = async (x) => {
    const data = { nature: "?" };
    data.nature = x;

    console.log("data nature ", data.nature, "   id  ", idItem);
    const lequel = doc(depensesCollectionRef, idItem);
    await updateDoc(lequel, data);
    setShowModal("false");
  };

  const supprimer = async (id) => {
    const lequel = doc(depensesCollectionRef, id);
    await deleteDoc(lequel);
    // console.log("item ", lequel);
    setShowModal("false");
  };

  const ajouter = async (newItem) => {
    // console.log("item ajouté  ", newItem);
    setShowModal("false");
    const depensesRef = await addDoc(collection(db, "depenses"), {
      nature: newItem,
    });
    console.log(" nouveau doc id = ", depensesRef.id);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Modal
        leQuel={natureDepenses}
        show={showModal}
        onValid={(x) => {
          modifier(x);
        }}
        onNewDonnees={(newItem) => {
          ajouter(newItem);
        }}
        onDelete={() => {
          supprimer(idItem);
        }}
        onClose={() => {
          setShowModal("false");
        }}
      >
        <p>Modal</p>
      </Modal>
      <div className="depenses-container">
        <h3 className="display-2">Gestion des dépenses</h3>

        <div className="depenses-table">
          {depenses.map((item, index) => {
            return (
              <li
                className="ligne"
                key={item.id}
                onClick={() => {
                  setNatureDepenses(item.nature);
                  setIdItem(item.id);
                  // console.log("clické sur ", item.nature);
                  setShowModal("true");
                }}
                show={showModal}
              >
                {index < 9 ? "0" + (index + 1).toString(10) : index + 1}{" "}
                {item.nature}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SnapshotDepenses;
