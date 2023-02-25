import React, { useEffect, useState, Component } from "react";
import Navbar from "../components/Navbar";
import "../styles/depenses.scss";
import { db } from "./FirebaseConfig";
import Modal from "../components/Modale";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { AuthContext } from "./FirebaseConfig";

const SnapshotDepenses = () => {
  const [depenses, setDepenses] = useState([]);
  const depensesCollectionRef = collection(db, "depenses");
  const [natureDepenses, setNatureDepenses] = useState("");
  const [showModal, setShowModal] = useState(false);
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
  const modifier = () => {
    const data = { nature: "?" };
    setShowModal(true);
    data.nature = natureDepenses;

    console.log("item ", data.nature, "   id  ", idItem);
    const lequel = doc(depensesCollectionRef, idItem);
    updateDoc(lequel, data);
  };

  const supprimer = (id) => {
    let lequel = doc(depensesCollectionRef, id);
    // deleteDoc(lequel);
    // console.log("item ", lequel);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Modal
        leQuel={natureDepenses}
        show={showModal}
        onValid={() => {
          modifier();
          // setShowModal(false);
        }}
        onDelete={() => {
          setShowModal(false);
        }}
        onClose={() => {
          setShowModal(false);
        }}
        okChange={setNatureDepenses}
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
                // onClick={() => cliquer(item.id, item.nature)}
                onClick={() => {
                  setShowModal(true);
                  setNatureDepenses(item.nature);
                  setIdItem(item.id);
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
