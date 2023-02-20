import { useState, useEffect } from "react";
import ModalOrderItem from "./ModalOrderItem.component";

function ModalOrder() {
  const [apiData, setApiData] = useState([
    {
      numero: "1",
      mail: "mathis.quemener@gmail.com",
      date: "2023-02-20 18:37:51",
      id: "1",
      quantite: "2",
      quantite_total: "12",
      nom: "Coca-cola",
      prix: "1.5",
      image: null,
      poids: "33",
    },
    {
      numero: "1",
      mail: "mathis.quemener@gmail.com",
      date: "2023-02-20 18:37:51",
      id: "2",
      quantite: "3",
      quantite_total: "25",
      nom: "Fanta",
      prix: "1.5",
      image: null,
      poids: "33",
    },
    {
      numero: "2",
      mail: "mathis.quemener@gmail.com",
      date: "2023-02-20 18:37:51",
      id: "2",
      quantite: "3",
      quantite_total: "25",
      nom: "Fanta",
      prix: "1.5",
      image: null,
      poids: "33",
    },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    apiData.forEach((data) => {
      total += data.prix * data.quantite;
    });
    setTotal(total);
    setApiData(apiData);
  }, [apiData]);

  return (
    <>
      <h2>Votre panier</h2>
      {apiData.map((data) => (
        <ModalOrderItem data={data} key={data.id} />
      ))}
      <div className="totaldiv">
        <p>Total : </p>
        <p className="total">{total} €</p>
      </div>
      <div className="commandeButton">
        <button className="annuler">Annuler la commande</button>
        <button className="ajouter">Commander</button>
      </div>
    </>
  );
}

export default ModalOrder;
