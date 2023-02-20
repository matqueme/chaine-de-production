import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ModalProduit() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    id: "0",
    nom: "Coca-Cola",
    quantite: "15",
    prix: "1.5",
    image: "/coke-can.png",
    fournisseur: "idk", //sert à rien
    marque: "Coca-Cola", //sert à rien
    poids: "33 cl",
    taille: "33 cl", //sert à rien
  });

  const [quantite, setQuantite] = useState(1);

  //changer la quantité de produit minimum 1 maximum 99
  function changeQuantite(e) {
    if (apiData.quantite < e) {
      setQuantite(apiData.quantite);
    } else if (e > 99) {
      setQuantite(99);
    } else if (e < 1) {
      setQuantite(1);
    } else {
      setQuantite(e);
    }
    //a supprimer apres
    setApiData(apiData);
  }
  return (
    <>
      <img src={apiData.image} alt={apiData.nom} />
      <div className="infoProduit">
        <h2>{apiData.nom}</h2>
        <p>{apiData.poids}</p>
      </div>
      <p className="price">{apiData.prix} €</p>

      <div className="ajoutProduit">
        <button
          onClick={() => {
            changeQuantite(quantite - 1);
          }}
          className="moins"
        >
          -
        </button>
        <p className="quantiteProduit">{quantite}</p>
        <button
          onClick={() => {
            changeQuantite(quantite + 1);
          }}
          className="plus"
        >
          +
        </button>
        <p className="maxProduit">(Max {apiData.quantite})</p>
      </div>

      <div className="commandeButton">
        <button className="annuler" onClick={() => navigate("/")}>
          Annuler
        </button>
        <button className="ajouter">Ajouter</button>
      </div>
    </>
  );
}
export default ModalProduit;
