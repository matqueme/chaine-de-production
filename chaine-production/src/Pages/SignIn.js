import { Link } from "react-router-dom";
import NameWebsite from "../Components/NameWesite.component";
import { useState } from "react";

const SignIn = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sign">
      <div className="signchild">
        <NameWebsite />
        <h2>Connexion</h2>
        <h3>
          Entrez vos informations de connexion pour accéder a votre compte.
        </h3>

        <form>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => {
              setMail(e.target.data);
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
        <p className="changeConnect">
          Pas encore membre ?&nbsp;<Link to={"../signup"}>Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
