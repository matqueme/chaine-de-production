import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function ModalProduit() {
  const navigate = useNavigate();
  const param = useParams();
  const [apiData, setApiData] = useState([]);
  const [quantite, setQuantite] = useState(0);
  const [isProductInOrder, setIsProductInOrder] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  //await
  useEffect(() => {
    //recuperer les données de l'api
    const fetchData = async () => {
      let cookies = new Cookies();
      let formdata = new FormData();
      formdata.append("api_key", cookies.get("api_key"));
      formdata.append("auth_key", cookies.get("auth_key"));
      formdata.append("id_product", param.id);

      axios
        .all([
          axios.get("http://projet.local/index/api/produit/" + param.id),
          axios.post("http://projet.local/index/api/nbinproduct", formdata),
        ])
        .then(
          axios.spread((data1, data2) => {
            setApiData(data1.data[0]);
            if (data2.data.length > 0) {
              setQuantite(data2.data[0].quantite);
              setIsProductInOrder(true);
            }
            setIsLoaded(true);
          })
        )
        .catch((error) => {
          if (error.response.status === 401) navigate("/signin");
        });
    };
    fetchData();
  }, [param, navigate]);

  function addToOrder() {
    if (quantite === 0) {
      return;
    }
    //fait une fonction asynchrone pour envoyer les données
    const fetchData = async () => {
      let cookies = new Cookies();
      let formdata = new FormData();
      formdata.append("api_key", cookies.get("api_key"));
      formdata.append("auth_key", cookies.get("auth_key"));
      formdata.append("id_product", param.id);
      formdata.append("nb_product", quantite);
      axios
        .post("http://projet.local/index/api/addproduct", formdata)
        .then((data) => {
          navigate("/");
        });
    };
    fetchData();
  }

  const deleteProduct = () => {
    //fait une fonction asynchrone pour envoyer les données
    const fetchData = async () => {
      let cookies = new Cookies();
      let formdata = new FormData();
      formdata.append("api_key", cookies.get("api_key"));
      formdata.append("auth_key", cookies.get("auth_key"));
      formdata.append("id_product", param.id);
      axios
        .post("http://projet.local/index/api/deleteProduct", formdata)
        .then((data) => {
          navigate("/");
        });
    };
    fetchData();
  };
  return (
    <>
      {isLoaded ? (
        <>
          <img src={apiData.image} alt={apiData.nom} />
          <div className="infoProduit">
            <h2>{apiData.nom}</h2>
            <p>{apiData.poids} cl</p>
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
            {isProductInOrder ? (
              <button className="supprimer" onClick={() => deleteProduct()}>
                Supprimer
              </button>
            ) : (
              <button className="annuler" onClick={() => navigate("/")}>
                Annuler
              </button>
            )}
            <button className="ajouter" onClick={() => addToOrder()}>
              Ajouter
            </button>
          </div>
        </>
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
}
export default ModalProduit;
