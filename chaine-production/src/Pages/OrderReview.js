import OrderAccount from "../Components/OrderAccount.component";
import "./Account.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Lottie from "lottie-react";
import animationData from "../Assets/verify.json";

const Account = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState([]);
  //pour le timer
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  //pour le modal de validation
  const [animation, setAnimation] = useState(false);
  const [animationfade, setAnimationfade] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = new Cookies();
      let formdata = new FormData();
      formdata.append("api_key", cookies.get("api_key"));
      formdata.append("auth_key", cookies.get("auth_key"));
      axios
        .post("http://projet.local/index/api/account", formdata)
        .then((response) => {
          if (response.data !== false) {
            setApi(response.data);
          } else {
            navigate("/signin");
          }
        })
        .catch(() => {});
    };
    fetchData();
    setAnimation(true);
    setAnimationfade(true);
  }, [navigate]);

  //click sur la croix pour deconnecter l'utilisateur
  const disconnectClick = () => {
    //remove cookies
    const cookies = new Cookies();
    cookies.remove("api_key");
    cookies.remove("auth_key");
    navigate("/signin");
  };

  //timer
  useEffect(() => {
    let timer = null;
    const resetTimer = () => {
      setIsActive(true);
      setShowModal(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsActive(false);
        setShowModal(true);
      }, 15000); // délai de 15 secondes avant d'afficher le modal
    };

    resetTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchmove", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchmove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      const timer = setTimeout(() => {
        //remove cookies
        const cookies = new Cookies();
        cookies.remove("api_key");
        cookies.remove("auth_key");
        navigate("/signin");
      }, 10000); // délai de 10 secondes avant de rediriger l'utilisateur
      return () => clearTimeout(timer);
    }
  }, [isActive, navigate]);

  const handleReactivate = () => {
    setIsActive(true);
    setShowModal(false);
  };

  //animation de validation

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

  return (
    <div className="account">
      <div className="title-account">
        <div>
          <h2>Mes commandes</h2>
          <h3>Historique de toutes vos commandes</h3>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 96 960 960"
          width="48"
          onClick={() => disconnectClick()}
        >
          <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
        </svg>
      </div>
      {api.map((order) => (
        <OrderAccount
          key={order.numero}
          numero_commande={order.numero}
          date={order.date}
          status={order.type}
          status_number={order.id_type}
        />
      ))}
      <div
        className={`lottie-wrapper ${animationfade ? "fade-in" : "fade-out"}`}
      >
        {animation && (
          <div className="lottie">
            <h2>Commande validé</h2>
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

      {/*Modal for a pop-up of deconnexion*/}
      {showModal && (
        <div className={`lottie-wrapper`}>
          <div className="lottie">
            <h2>Deconnexion</h2>
            <p> Vous aller être déconnecter dans 10 secondes</p>

            <button onClick={handleReactivate}>Continuer la visite</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
