import { useState, useEffect } from "react";
import ProductCard from "../Components/PoductCard.component";
import "./Home.scss";
import OrderBar from "../Components/OrderBar.component";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Lottie from "lottie-react";
import animationData from "../Assets/verify.json";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [api, setApi] = useState([]);
  const [prenom, setPrenom] = useState("");
  const [price, setPrice] = useState("0");
  const [animation, setAnimation] = useState(false);
  const [animationfade, setAnimationfade] = useState(false);
  const [modalText, setModalText] = useState("");

  //useeffect pour recuperer les données de l'api
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

            setPrenom(data2.data[0].prenom);
            data3.data[0].prix_total !== null
              ? setPrice(data3.data[0].prix_total)
              : setPrice("0");
          })
        )
        .catch((error) => {
          if (error.response.status === 401) navigate("/signin");
        });
    };
    fetchData();
  }, [navigate]);

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
          if (
            response.data[0].prix_total !== null &&
            response.data[0].prix_total !== price &&
            location.state?.from !== "account"
          ) {
            response.data[0].prix_total > price &&
              setModalText("Produit ajouté");
            response.data[0].prix_total < price &&
              setModalText("Commande modifiée");

            setPrice(response.data[0].prix_total);

            setAnimation(true);
            setAnimationfade(true);
          }
          if (response.data[0].prix_total === null) {
            setPrice("0");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) navigate("/signin");
        });
    };
    fetchData();
  }, [location, navigate, price]);

  //useeffect pour l'animation de l'ajout de produit dans le panier
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
        {/*<ul>
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
  </ul>*/}
        <div className="home__container">
          <h2 className="first">Bonjour {prenom}, </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
            onClick={() => {
              navigate("/account");
            }}
          >
            <path d="M222.957 798.37q62.76-39.761 124.021-59.903Q408.239 718.326 480 718.326t133.761 20.38q62 20.381 124.282 59.664 43.522-54.24 61.663-108.153Q817.848 636.303 817.848 576q0-143.863-96.98-240.856-96.98-96.992-240.826-96.992t-240.868 96.992Q142.152 432.137 142.152 576q0 60.283 18.528 114.139 18.529 53.856 62.277 108.231Zm256.857-190.696q-58.569 0-98.409-40.045-39.84-40.044-39.84-98.456 0-58.412 40.026-98.39 40.026-39.979 98.595-39.979 58.569 0 98.409 40.165 39.84 40.164 39.84 98.576 0 58.412-40.026 98.27-40.026 39.859-98.595 39.859Zm-.219 374.304q-84.103 0-158.336-31.926-74.234-31.926-129.28-87.328-55.047-55.401-86.502-129.279-31.455-73.878-31.455-157.919 0-84.04 31.978-157.957 31.978-73.917 87.315-128.754 55.337-54.837 129.231-86.935 73.895-32.098 157.954-32.098 84.059 0 157.954 32.098 73.894 32.098 128.731 86.935 54.837 54.837 86.935 128.891 32.098 74.053 32.098 158.028 0 83.974-32.098 157.794-32.098 73.82-86.935 129.157-54.837 55.337-129.02 87.315-74.182 31.978-158.57 31.978Z" />
          </svg>
        </div>
        <h2 className="second">Qu'est-ce qui vous ferait plaisir ?</h2>

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
              <h2>{modalText}</h2>
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
