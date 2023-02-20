import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Modal.scss";

//pour le post a chaque ajout de produit (le +) ou juste confirmer
//pb 1 : si y a plusieurs commande en meme temps, on va avoir des conflits sur le maximum

function Modal() {
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

  //composant est monté on bloque le scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  //composant est démonté on débloque le scroll
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="modalDiv">
      <div className="modal">
        <div className="modalContent">
          <button onClick={() => navigate("/")} className="close">
            <svg
              id="Calque_1"
              data-name="Calque 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 264.51 264.39"
            >
              <path d="M115.46,132.47c-1.34-1.41-2.25-2.4-3.21-3.36C76.33,93.21,40.4,57.32,4.49,21.41-.42,16.5-1.35,10.58,1.93,5.53,6.12-.95,14.93-1.82,20.7,3.82c6.79,6.62,13.44,13.38,20.15,20.09,29.48,29.46,58.96,58.92,88.43,88.39,.88,.88,1.59,1.93,2.64,3.21,1.43-1.37,2.5-2.34,3.52-3.36C171.08,76.49,206.73,40.85,242.33,5.16c3.03-3.04,6.25-5.42,10.74-5.13,4.74,.3,8.31,2.6,10.28,6.96,1.96,4.34,1.42,8.53-1.46,12.33-.97,1.28-2.19,2.39-3.33,3.54-35.37,35.39-70.75,70.78-106.13,106.15-.96,.96-2.08,1.77-4.47,3.79,1.91,1.12,3.44,1.65,4.47,2.67,35.7,35.59,71.34,71.24,107.04,106.83,3.35,3.34,5.68,6.92,4.9,11.89-1.44,9.15-11.99,13.29-19.26,7.52-1.17-.93-2.19-2.04-3.25-3.1-35.39-35.37-70.79-70.73-106.16-106.12-1.04-1.04-1.89-2.27-2.98-3.59-1.6,1.53-2.68,2.53-3.72,3.57-35.73,35.73-71.47,71.46-107.16,107.23-3.17,3.18-6.64,5.22-11.28,4.6-4.61-.62-7.89-3.1-9.55-7.39-1.7-4.4-1.11-8.65,2.06-12.24,2.39-2.71,5.06-5.17,7.62-7.73,33.79-33.8,67.57-67.6,101.37-101.39,.97-.97,2.03-1.84,3.4-3.07Z" />
            </svg>
          </button>
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
          {/* <p>Modal {location.pathname}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
