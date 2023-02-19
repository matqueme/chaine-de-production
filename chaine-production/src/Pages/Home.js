import { useState, useEffect } from "react";
import ProductCard from "../Components/PoductCard.component";
import "./Home.scss";
import OrderBar from "../Components/OrderBar.component";
import { Link, Outlet, useLocation } from "react-router-dom";

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
  const location = useLocation();
  //useeffect pour recuperer le changement de la variable d'url
  useEffect(() => {}, [location]);

  /*----------------------Affichage----------------------*/

  return (
    <>
      <div className="home">
        <ul>
          <li>
            <Link to="/signin">signin</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/account">account</Link>
          </li>
          <li>
            <Link to="/allaccount">allaccount</Link>
          </li>
          <li>
            <Link to="/error">error</Link>
          </li>
          <li>
            <button onClick={test}> test</button>
          </li>
        </ul>

        <h2 className="first">Bonjour, </h2>
        <h2 className="second">Comment allez vous ?</h2>

        <div className="product-container">
          {api.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <OrderBar price={10} />
      </div>
      <Outlet />
    </>
  );
}
export default Home;
