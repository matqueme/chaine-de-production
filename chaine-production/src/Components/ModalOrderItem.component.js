import React from "react";
//ca sera ajouter a la bdd lorsque l'on fera la croix ou lorsque l'on valide le panier
function ModalOrderItem(props) {
  let data = props.data;

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
        <button className="moins">-</button>
        <div className="quantite">
          <p className="quantiteProduit">{data.quantite}</p>
          <p className="max">(Max {data.quantite_total})</p>
        </div>
        <button className="plus">+</button>
        <button className="remove">x</button>
        {/* <p>{data.prix * data.quantite} €</p> */}
      </div>
    </div>
  );
}

export default ModalOrderItem;
