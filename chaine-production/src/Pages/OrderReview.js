import OrderAccount from "../Components/OrderAccount.component";
import "./Account.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Account = () => {
  const navigate = useNavigate();
  const [api, setApi] = useState([]);
  const [disconnect, setDisconnect] = useState(false);

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
  }, [navigate]);

  //if user does noting for 2 minutes, he will be disconnected
  useEffect(() => {
    const timeout = setTimeout(() => {
      //remove cookies
      //const cookies = new Cookies();
      //cookies.remove("api_key");
      //cookies.remove("auth_key");
      //navigate("/signin");
      console.log("deco");
    }, 1000);

    //create a timer of 1 minute for open the modal
    const timeoutModal = setTimeout(() => {
      setDisconnect(!disconnect);
      console.log("modal");
    }, 30000);

    //si disconnect est true, on remet le timer a 0
    if (disconnect) {
      clearTimeout(timeoutModal);
    }

    return () => clearTimeout(timeoutModal, timeout);
  }, [navigate, disconnect]);

  //click sur la croix pour deconnecter l'utilisateur
  const disconnectClick = () => {
    //remove cookies
    const cookies = new Cookies();
    cookies.remove("api_key");
    cookies.remove("auth_key");
    navigate("/signin");
  };

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

      {/*Modal for a pop-up of deconnexion*/}
      {disconnect && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">
              <h2>Deconnexion</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
                onClick={() => setDisconnect(false)}
              >
                <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
