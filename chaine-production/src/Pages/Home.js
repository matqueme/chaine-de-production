import { useState, useEffect } from "react";
import ProductCard from "../Components/PoductCard.component";
import "./Home.scss";
import OrderBar from "../Components/OrderBar.component";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function Home() {
  const navigate = useNavigate();
  const [api, setApi] = useState([]);
  const [prenom, setPrenom] = useState("");
  const [price, setPrice] = useState("");
  //await
  useEffect(() => {
    //recuperer les données de l'api
    const fetchData = async () => {
      const cookies = new Cookies();

      let formdata = new FormData();
      formdata.append("api_key", cookies.get("api_key"));
      formdata.append("auth_key", cookies.get("auth_key"));

      axios
        .all([
          axios.get("http://projet.local/index/api/produits"),
          axios.post("http://projet.local/index/api/infouser", formdata),
          axios.post("http://projet.local/index/api/pricecommande", formdata),
        ])
        .then(
          axios.spread((data1, data2, data3) => {
            setApi(data1.data);
            if (data2.data !== false || data3.data !== false) {
              setPrenom(data2.data[0].prenom);
              data3.data[0].prix_total !== null
                ? setPrice(data3.data[0].prix_total)
                : setPrice("0");
            } else {
              navigate("/signin");
            }
          })
        )
        .catch(() => {});
    };
    fetchData();
  }, [navigate]);

  const location = useLocation();
  //useeffect pour recuperer le changement de la variable d'url
  useEffect(() => {
    //recuperer les données de l'api
    const fetchData = async () => {
      const cookies = new Cookies();
      let formdata = new FormData();
      formdata.append("api_key", cookies.get("api_key"));
      formdata.append("auth_key", cookies.get("auth_key"));
      axios
        .post("http://projet.local/index/api/pricecommande", formdata)
        .then((response) => {
          if (response.data !== false) {
            response.data[0].prix_total !== null
              ? setPrice(response.data[0].prix_total)
              : setPrice("0");
          } else {
            navigate("/signin");
          }
        })
        .catch(() => {});
    };
    fetchData();
  }, [location, navigate]);

  /*----------------------Affichage----------------------*/

  return (
    <>
      <div className="home">
        <ul>
          <li>
            <Link to="/signin">signin</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/account">account</Link>
          </li>
          <li>
            <Link to="/allaccount">allaccount</Link>
          </li>
          <li>
            <Link to="/error">error</Link>
          </li>
        </ul>

        <h2 className="first">Bonjour {prenom}, </h2>
        <h2 className="second">Comment allez-vous ?</h2>

        <div className="product-container">
          {api.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <OrderBar price={price} />
      </div>
      <Outlet />
    </>
  );
}
export default Home;
