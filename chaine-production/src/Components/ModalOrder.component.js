import { useState, useEffect } from "react";

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
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    apiData.forEach((data) => {
      total += data.prix * data.quantite;
    });
    setTotal(total);
  }, [apiData]);

  return (
    <>
      <div className="modal-order__header">
        <h2>Commande n°{apiData[0].numero}</h2>
        <p>Commande passée le {apiData[0].date}</p>
        {apiData.map((data) => (
          <div className="modal-order__body" key={data.id}>
            <div className="modal-order__body__product">
              <div className="modal-order__body__product__image"></div>
              <div className="modal-order__body__product__info">
                <h3>{data.nom}</h3>
                <p>{data.poids} cl</p>
              </div>
            </div>
            <div className="modal-order__body__quantity">
              <p>{data.quantite}</p>
              <p>{data.quantite_total}</p>
            </div>
            <div className="modal-order__body__price">
              <p>{data.prix} €</p>
            </div>
          </div>
        ))}
        <p>Total : {total} €</p>
      </div>
    </>
  );
}

export default ModalOrder;
