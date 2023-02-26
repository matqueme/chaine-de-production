import { useState, useEffect } from "react";
//revoir, test si je fais avec des get/set ou avec des usestate
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
      id: "3",
      quantite: "3",
      quantite_total: "25",
      nom: "Fanta",
      prix: "1.5",
      image: null,
      poids: "33",
    },
  ]);
  const [total, setTotal] = useState(0);
  const [quantite, setQuantite] = useState(() =>
    apiData.map((item) => parseInt(item.quantite))
  );

  console.log(quantite);
  //changer la quantité de produit minimum 1 maximum 99
  function changeQuantite(e, index) {
    if (apiData[index].quantite_total < e) {
      setQuantite(parseInt(apiData[index].quantite_total));
    } else if (e > 99) {
      setQuantite(99);
    } else if (e < 1) {
      setQuantite(1);
    } else {
      setQuantite(e[index]);
    }
  }

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
      {apiData.map((data, index) => (
        <div className="orderItem" key={data.id}>
          <div className="orderProduct">
            <img src="/coke-can.png" alt={data.nom} />
            <div className="text">
              <h2>{data.nom}</h2>
              <h3>{data.poids} cl</h3>
            </div>
          </div>
          <div className="orderModif">
            <button
              className="moins"
              onClick={() => changeQuantite(quantite[index] - 1, index)}
            >
              -
            </button>
            <div className="quantite">
              <p className="quantiteProduit">{quantite[index]}</p>
              <p className="max">(Max {data.quantite_total})</p>
            </div>
            <button
              className="plus"
              onClick={() => changeQuantite(quantite[index] + 1, index)}
            >
              +
            </button>
            <button className="remove">x</button>
            {/* <p>{data.prix * data.quantite} €</p> */}
          </div>
        </div>
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
