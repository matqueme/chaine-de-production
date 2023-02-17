import { Link } from "react-router-dom";
import NameWebsite from "../Components/NameWesite.component";

const SignIn = () => {
  return (
    <div className="sign">
      <NameWebsite />
      <h2>Connexion</h2>
      <h3>Entrez vos informations de connexion pour accéder a votre compte.</h3>

      <form>
        <label htmlFor="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="Connexion" />
      </form>
      <p>
        Pas encore membre ?<Link to={"../signup"}>Inscrivez-vous</Link>
      </p>
    </div>
  );
};

export default SignIn;
