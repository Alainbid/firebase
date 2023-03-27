import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/depenses.scss";
import "../styles/setting.scss";
import "../styles/app.scss";

import { db } from "./FirebaseFirestore";
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
  const benefCollectionRef = collection(db, "benef");
  const [natureBenef, setNatureBenef] = useState("");
  const [showModal, setShowModal] = useState("false");
  const [idItem, setIdItem] = useState("");

  const [modalPosition, setModalPosition] = useState([0, 0]);

  useEffect(() => {
    const getDepenses = async () => {
      const data = await getDocs(query(benefCollectionRef, orderBy("qui")));
      setDepenses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDepenses();
  }, [benefCollectionRef]);

  //**********  MODIFIER ********** */
  const modifier = async (x) => {
    const data = { qui: "?" };
    data.qui = x;

    console.log("data nature ", data.qui, "   id  ", idItem);
    const lequel = doc(benefCollectionRef, idItem);
    await updateDoc(lequel, data);
    setShowModal("false");
  };

  const supprimer = async (id) => {
    const lequel = doc(benefCollectionRef, id);
    await deleteDoc(lequel);
    // console.log("item ", lequel);
    setShowModal("false");
  };

  const ajouter = async (newItem) => {
    // console.log("item ajouté  ", newItem);
    setShowModal("false");
    const depensesBenef = await addDoc(collection(db, "benef"), {
      qui: newItem,
    });
    console.log(" nouveau doc id = ", depensesBenef.id);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Modal
        posdex={modalPosition[0]}
        posdey={modalPosition[1]}
        leQuel={natureBenef}
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
        <p></p>
      </Modal>
      <div className="depenses-container">
        <h3>Liste des Bénéficiaires</h3>

        <div className="depenses-table">
          {depenses.map((item, index) => {
            return (
              <li
                className="ligne"
                posdex={modalPosition[0]}
                posdey={modalPosition[1]}
                key={item.id}
                onClick={(event) => {
                  console.log(" x ", event.clientX, "   y = ", event.clientY);
                  setModalPosition([event.clientX, event.clientY]);
                  console.log(
                    " x ",
                    modalPosition[0],
                    "   y = ",
                    modalPosition[1]
                  );
                  setNatureBenef(item.qui);
                  setIdItem(item.id);
                  // console.log("clické sur ", item.qui);
                  setShowModal("true");
                }}
                show={showModal}
              >
                {index < 9 ? "0" + (index + 1).toString(10) : index + 1}{" "}
                {item.qui}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SnapshotDepenses;
