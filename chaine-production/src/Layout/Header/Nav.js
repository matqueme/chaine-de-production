import { Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  return (
    <div className="navbar">
      <div>
        <div className="nameWebsite">NAME</div>
        <ul className="nav-links">
          <li className="title">Tableau de bord</li>
          <li className="subtitle">
            <Link to="/" className="subtitle">
              Commandes
            </Link>
          </li>
          <li className="title">Gestion</li>
          <li className="subtitle">
            <Link to="/test" className="subtitle">
              Créer des commandes
            </Link>
          </li>
          <li className="subtitle">
            <Link to="/12" className="subtitle">
              Historique commandes
            </Link>
          </li>
        </ul>
      </div>
      <div className="navConnexion">
        <button className="button">Connexion</button>
      </div>
    </div>
  );
}
