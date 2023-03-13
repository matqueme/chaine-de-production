import { Link, useNavigate } from "react-router-dom";
import NameWebsite from "../Components/NameWesite.component";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const SignIn = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //check if the user is already connected
    const cookies = new Cookies();
    // axios.defaults.headers.common["Authorization"] =
    //   "Bearer " + cookies.get("api_key");
    let data = new FormData();
    data.append("api_key", cookies.get("api_key"));
    data.append("auth_key", cookies.get("auth_key"));
    axios
      .post("http://projet.local/index/api/tryconnection", data)
      .then((response) => {
        if (response.data === true) {
          //redirect to the home page with react router dom
          navigate("/");
        }
      })
      .catch(() => { });
  }, [navigate]);

  function connection(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("mail", mail);
    data.append("password", password);

    axios
      .post("http://projet.local/index/api/connection", data)
      .then((response) => {
        if (response.data !== false) {
          //create a cookie
          const cookies = new Cookies();
          cookies.set("api_key", response.data.api_key, {
            path: "/",
            //+1 hour
            expires: new Date(new Date().getTime() + 3600000),
          });
          cookies.set("auth_key", response.data.auth_key, {
            path: "/",
            expires: new Date(new Date().getTime() + 3600000),
          });
          //redirect to the home page with react router dom
          navigate("/");
        } else {
          setError("Identifiants incorrects");
        }
      })
      .catch(() => { });
  }

  return (
    <div className="sign">
      <div className="signchild">
        <NameWebsite />
        <h2>Connexion</h2>
        <h3>
          Entrez vos informations de connexion pour accéder à votre compte.
        </h3>

        <form onSubmit={connection}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              setMail(e.target.value);
            }}
            className={mail === "" ? "empty" : ""}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={password === "" ? "empty" : ""}
          />

          <input type="submit" value="Connexion" className="submitButton" />
        </form>
        <div className="error">{error}</div>
        <p className="changeConnect">
          Pas encore membre ?&nbsp;<Link to={"../signup"}>Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
