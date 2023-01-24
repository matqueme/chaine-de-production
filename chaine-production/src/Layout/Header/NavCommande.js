import { Link } from "react-router-dom";
import "./NavCommande.scss";
function NavCommande(props) {
  // Verifier si cela correspond bien au bon avec l'ajout de Compléter dans la BDD

  return (
    <ul class="navCommande">
      <span class="line"></span>
      <li class="select">
        <Link to="/commandes">Toutes les commandes</Link>
        <span class="lineselect"></span>
      </li>
      <li class="notSelect">
        <Link to="/atraiter">A traiter ({props.nb_type[0].atraiter})</Link>
        <span class="line"></span>
      </li>
      <li class="notSelect">
        <Link to="/continuer">Continuer ({props.nb_type[0].continuer})</Link>
        <span class="line"></span>
      </li>
      <li class="notSelect">
        <Link to="/completer">Compléter</Link>
        <span class="line"></span>
      </li>
      <li class="notSelect">
        <Link to="/annulee">Annulée ({props.nb_type[0].annulee})</Link>
        <span class="line"></span>
      </li>
      <li class="notSelect">
        <Link to="/robot">Envoie au robot ({props.nb_type[0].envoirobot})</Link>
        <span class="line"></span>
      </li>
    </ul>
  );
}

export default NavCommande;
