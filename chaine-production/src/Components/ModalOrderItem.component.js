import { useState } from "react";

//ca sera ajouter a la bdd lorsque l'on fera la croix ou lorsque l'on valide le panier
function ModalOrderItem(props) {
  let data = props.data;
  const [quantite, setQuantite] = useState(parseInt(data.quantite));
  console.log(quantite);
  //changer la quantité de produit minimum 1 maximum 99
  function changeQuantite(e) {
    if (data.quantite_total < e) {
      setQuantite(parseInt(data.quantite_total));
    } else if (e > 99) {
      setQuantite(99);
    } else if (e < 1) {
      setQuantite(1);
    } else {
      setQuantite(e);
    }
  }
  return (
    <div className="orderItem">
      <div className="orderProduct">
        <img src="/coke-can.png" alt={data.nom} />
        <div className="text">
          <h2>{data.nom}</h2>
          <h3>{data.poids} cl</h3>
        </div>
      </div>
      <div className="orderModif">
        <button className="moins" onClick={() => changeQuantite(quantite - 1)}>
          -
        </button>
        <div className="quantite">
          <p className="quantiteProduit">{quantite}</p>
          <p className="max">(Max {data.quantite_total})</p>
        </div>
        <button className="plus" onClick={() => changeQuantite(quantite + 1)}>
          +
        </button>
        <button className="remove">x</button>
        {/* <p>{data.prix * data.quantite} €</p> */}
      </div>
    </div>
  );
}

export default ModalOrderItem;
