import { Link } from "react-router-dom";
import "./NavCommande.scss";
function NavCommande(props) {
  // Verifier si cela correspond bien au bon avec l'ajout de Compléter dans la BDD

  return (
    <ul className="navCommande">
      <span className="line"></span>
      <li className={props.chose === "commandes" ? "select" : "notSelect"}>
        <Link to="/commandes">
          Toutes les commandes
          <span
            className={props.chose === "commandes" ? "lineselect" : "line"}
          ></span>
        </Link>
      </li>
      <li className={props.chose === "atraiter" ? "select" : "notSelect"}>
        <Link to="/atraiter">
          A traiter ({props.nb_type[0].atraiter})
          <span
            className={props.chose === "atraiter" ? "lineselect" : "line"}
          ></span>
        </Link>
      </li>
      <li className={props.chose === "continuer" ? "select" : "notSelect"}>
        <Link to="/continuer">
          Continuer ({props.nb_type[0].continuer})
          <span
            className={props.chose === "continuer" ? "lineselect" : "line"}
          ></span>
        </Link>
      </li>
      <li className={props.chose === "completer" ? "select" : "notSelect"}>
        <Link to="/completer">
          Compléter
          <span
            className={props.chose === "completer" ? "lineselect" : "line"}
          ></span>
        </Link>
      </li>
      <li className={props.chose === "annulee" ? "select" : "notSelect"}>
        <Link to="/annulee">
          Annulée ({props.nb_type[0].annulee}){" "}
          <span
            className={props.chose === "annulee" ? "lineselect" : "line"}
          ></span>
        </Link>
      </li>
      <li className={props.chose === "robot" ? "select" : "notSelect"}>
        <Link to="/robot">
          Envoie au robot ({props.nb_type[0].envoirobot}){" "}
          <span
            className={props.chose === "robot" ? "lineselect" : "line"}
          ></span>
        </Link>
      </li>
    </ul>
  );
}

export default NavCommande;
