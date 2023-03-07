import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const UserCard = (props) => {
  let navigate = useNavigate();
  const handleClick = () => {
    let formdata = new FormData();
    formdata.append("mail", props.account.mail);
    axios
      .post("http://projet.local/index/api/simpleconnexion", formdata)
      .then((response) => {
        let cookies = new Cookies();
        cookies.set("api_key", response.data.api_key, { path: "/" });
        cookies.set("auth_key", response.data.auth_key, { path: "/" });
        //Redirection vers la page d'accueil avec react router dom
        navigate("/home");
      });
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <div className="user-card__info">
        <div className="user-card__name">
          <p>{props.account.prenom}&nbsp;</p>
          <p>{props.account.nom}</p>
        </div>
        <p className="mailInfo">{props.account.mail}</p>
      </div>
      <div className="user-card__actions">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="38"
          viewBox="0 0 22 38"
        >
          <path
            d="M20.7678 20.7678C21.7441 19.7915 21.7441 18.2085 20.7678 17.2322L4.85786 1.32234C3.88155 0.346025 2.29863 0.346026 1.32232 1.32234C0.346013 2.29865 0.346014 3.88156 1.32232 4.85787L15.4645 19L1.32234 33.1421C0.346026 34.1185 0.346026 35.7014 1.32234 36.6777C2.29865 37.654 3.88156 37.654 4.85787 36.6777L20.7678 20.7678ZM17 21.5L19 21.5L19 16.5L17 16.5L17 21.5Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserCard;
