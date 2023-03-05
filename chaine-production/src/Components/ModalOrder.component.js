import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
//revoir, test si je fais avec des get/set ou avec des usestate
function ModalOrder() {
  const navigate = useNavigate();

  const [isLoad, setIsLoad] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantite, setQuantite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let cookies = new Cookies();
      let formdata = new FormData();
      formdata.append("api_key", cookies.get("api_key"));
      formdata.append("auth_key", cookies.get("auth_key"));
      await axios
        .post("http://projet.local/index/api/infocommande", formdata)
        .then((response) => {
          if (response.data === false) {
            navigate("/signin");
          } else {
            let tabQuantite = [];
            setApiData(response.data);
            response.data.map((item) => tabQuantite.push(item.quantite));
            setQuantite(tabQuantite);
            setIsLoad(true);
          }
        });
    };
    fetchData();
  }, [navigate]);

  //changer la quantité de produit minimum 1 maximum 99
  function changeQuantite(e, index) {
    const array = [...quantite];
    if (apiData[index].quantite_total < e) {
      array[index] = apiData[index].quantite_total;
      setQuantite(array);
    } else if (e > 99) {
      array[index] = 99;
      setQuantite(array);
    } else if (e < 1) {
      array[index] = 1;
      setQuantite(array);
    } else {
      array[index] = e;
      setQuantite(array);
    }

    let cookies = new Cookies();
    let formdata = new FormData();
    formdata.append("api_key", cookies.get("api_key"));
    formdata.append("auth_key", cookies.get("auth_key"));
    formdata.append("id_product", apiData[index].id);
    formdata.append("quantite", e);

    axios
      .post("http://projet.local/index/api/updateProduct", formdata)
      .then((response) => {
        if (response.data === false) {
          navigate("/signin");
        }
      });
  }

  function removeItem(index) {
    const array = [...apiData];
    array.splice(index, 1);
    setApiData(array);

    let cookies = new Cookies();
    let formdata = new FormData();
    formdata.append("api_key", cookies.get("api_key"));
    formdata.append("auth_key", cookies.get("auth_key"));
    formdata.append("id_product", apiData[index].id);

    axios
      .post("http://projet.local/index/api/deleteProduct", formdata)
      .then((response) => {
        if (response.data === false) {
          navigate("/signin");
        }
      });
  }

  useEffect(() => {
    let total = 0;
    apiData.forEach((data, index) => {
      total += data.prix * quantite[index];
    });
    setTotal(total);
  }, [apiData, quantite]);

  const validationCommande = () => {
    const fetchData = async () => {
      if (total !== 0) {
        let cookies = new Cookies();
        let formdata = new FormData();
        formdata.append("api_key", cookies.get("api_key"));
        formdata.append("auth_key", cookies.get("auth_key"));
        axios.post("http://projet.local/index/api/commande", formdata);
      } else {
        navigate("/account");
      }
    };
    fetchData();
  };

  return (
    <>
      {isLoad ? (
        <>
          <h2 className="panierh2">Votre panier</h2>
          {apiData.map((data, index) => (
            <div
              className={
                apiData.length === index + 1
                  ? "orderItem orderItemlast"
                  : "orderItem"
              }
              key={data.id}
            >
              <div className="orderProduct">
                <img src={data.image} alt={data.nom} />
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
                <button className="remove" onClick={() => removeItem(index)}>
                  x
                </button>
              </div>
            </div>
          ))}
          <div className="totaldiv">
            <p>Total : </p>
            <p className="total">{total} €</p>
          </div>
          <div className="commandeButton">
            <button className="annuler">Annuler la commande</button>
            <button className="ajouter" onClick={() => validationCommande()}>
              Commander
            </button>
          </div>
        </>
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
}

export default ModalOrder;
