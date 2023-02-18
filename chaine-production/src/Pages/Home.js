import { useState } from "react";
import ProductCard from "../Components/PoductCard.component";
import "./Home.scss";

function Home() {
  const [api, setApi] = useState([
    {
      id: 0,
      nom: "Coca-cola",
      image: "coke-can.png",
      poids: "33 cl",
    },
    {
      id: 1,
      nom: "Coca-cola",
      image: "coke-can.png",
      poids: "33 cl",
    },
    {
      id: 2,
      nom: "Coca-cola",
      image: "coke-can.png",
      poids: "33 cl",
    },
    {
      id: 3,
      nom: "Coca-cola",
      image: "coke-can.png",
      poids: "33 cl",
    },
  ]);

  function test() {
    //ajouter un produit dans le tableau api en utilisant la fonction setApi
    setApi([
      ...api,
      {
        id: api.length,
        nom: "Coca-cola",
        image: "coke-can.png",
        poids: "33 cl",
      },
    ]);
  }

  /*----------------------Affichage----------------------*/

  return (
    <div className="content">
      <ul>
        <li>
          <a href="signin">signin</a>
        </li>
        <li>
          <a href="signup">signup</a>
        </li>
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="account">account</a>
        </li>
        <li>
          <a href="allaccount">allaccount</a>
        </li>
        <li>
          <a href="error">error</a>
        </li>
        <li>
          <button onClick={test}> test</button>
        </li>
      </ul>

      <h1>Commandes</h1>
      <h2>Commande</h2>
      <div className="product-container">
        {api.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
export default Home;
