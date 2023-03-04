import { useState, useEffect } from "react";
import ProductCard from "../Components/PoductCard.component";
import "./Home.scss";
import OrderBar from "../Components/OrderBar.component";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Lottie from "lottie-react";
import animationData from "../Assets/verify.json";

function Home() {
  const navigate = useNavigate();
  const [api, setApi] = useState([]);
  const [prenom, setPrenom] = useState("");
  const [price, setPrice] = useState("0");
  const [animation, setAnimation] = useState(false);
  const [animationfade, setAnimationfade] = useState(false);
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
            if (
              response.data[0].prix_total !== null &&
              response.data[0].prix_total !== price &&
              response.data[0].prix_total >= price
            ) {
              setAnimation(true);
              setAnimationfade(true);
            }
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
  }, [location, navigate, price]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationfade(false);
      //wait 1s
      setTimeout(() => {
        setAnimation(false);
      }, 495);
    }, 1200);
    return () => clearTimeout(timer);
  }, [animation]);

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
        <div
          className={`lottie-wrapper ${animationfade ? "fade-in" : "fade-out"}`}
        >
          {animation && (
            <div className="lottie">
              <h2>Produit ajouté</h2>
              <Lottie
                animationData={animationData}
                height={150}
                width={150}
                loop={false}
                //enleve  3ms au debut de l'animation
                initialSegment={[3, 25]}
                speed={0.75}
              />
            </div>
          )}
        </div>
      </div>

      <Outlet />
      {/* lottie animation*/}
    </>
  );
}
export default Home;
