import BodyTab from "../Components/BodyTab.component";
import PageCount from "../Components/PageCount.component";
import { useState } from "react";

function Home() {
  const [api, setApi] = useState([
    {
      numero: "563834",
      date: "2023-01-05 19:12:02",
      mail: "pierre.dupont@gmail.com",
      type: "Non traitee",
      prix: "10,00 €",
    },
    {
      numero: "234569",
      date: "2023-01-03 18:15:02",
      mail: "agathe.lorn@gmail.com",
      type: "En cours",
      prix: "12,00 €",
    },
    {
      numero: "611111",
      date: "2023-01-03 18:18:02",
      mail: "testl.lorn@gmail.com",
      type: "En cours",
      prix: "10,00 €",
    },
    {
      numero: "211111",
      date: "2023-01-03 18:18:02",
      mail: "testl.lorn@gmail.com",
      type: "En cours",
      prix: "10,00 €",
    },
  ]);

  /*----------------------Trier----------------------*/
  //Pour trier les colonne pour savoir si on clique sur la même ou pas
  const [colomnSort, setColomnSort] = useState(3);
  //Pour savoir comment on trie les colonnes (croissant/decroissant)
  const [orientationSort, setOrientationSort] = useState(1);

  const orderData = (column, data) => {
    setColomnSort(column);
    //variable qu'on utilise dans la fonction car les useState ne sont pas a jour avant la fin de la fonction
    let orientation;
    //si c'est la même colonne qu'on double clique on inverse l'orientation
    if (column === colomnSort) {
      setOrientationSort(orientationSort * -1);
      orientation = orientationSort * -1;
      //sinon on le remet a 1 c'est a dire dans l'ordre croissant
    } else {
      setOrientationSort(1);
      orientation = 1;
    }

    //fonction de trie qui réatribue les valeur spread operator pour que react réactualise automatiquement
    const apiSorted = [...api].sort(function (a, b) {
      if (a[data] < b[data]) {
        return -1 * orientation;
      }
      if (a[data] > b[data]) {
        return 1 * orientation;
      }
      return 0;
    });
    //on affecte la nouvelle chaine JSON
    setApi(apiSorted);
  };

  /*----------------------Add----------------------TEMPORAIRE*/

  const append = () => {
    const nb = getRandomInt(100000);
    const makeid1 = makeid(8);
    let date1 = getRandomInt(24);
    let date2 = getRandomInt(59);
    let date3 = getRandomInt(30);
    let date4 = getRandomInt(12);
    if (date1 < 9) {
      date1 = "0" + date1;
    }
    if (date2 < 9) {
      date2 = "0" + date2;
    }
    if (date3 < 9) {
      date3 = "0" + date3;
    }
    if (date4 < 9) {
      date4 = "0" + date4;
    }
    setApi([
      ...api,
      {
        numero: nb,
        date: "2023-" + date4 + "-" + date3 + " " + date1 + ":" + date2 + ":05",
        mail: makeid1 + "@gmail.com",
        type: "Fait",
      },
    ]);

    setNumberPageTotal(
      [...Array(Math.floor((api.length - 1) / numberByPage) + 1).keys()].map(
        (x) => ++x
      )
    );
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function makeid(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /*----------------------Page----------------------*/

  const [numberByPage, setNumberByPage] = useState(10);
  const [numberOfThePage, setNumberOfThePage] = useState(1);
  const [numberPageTotal, setNumberPageTotal] = useState(
    [...Array(Math.floor((api.length - 1) / numberByPage) + 1).keys()].map(
      (x) => ++x
    )
  );

  //ajout de 1 pour la page si on est pas au max
  const pageAdd = () => {
    if (numberOfThePage - 1 < Math.floor((api.length - 1) / numberByPage)) {
      setNumberOfThePage(numberOfThePage + 1);
    }
  };

  //retrait de 1 pour la page si on est pas a la page 1
  const pageRemove = () => {
    if (numberOfThePage > 1) setNumberOfThePage(numberOfThePage - 1);
  };

  //verifie sur quel page on se met lorsque l'on change le nombre d'élément par page
  const checkpage = (newNumberPage) => {
    setNumberOfThePage(
      Math.floor(((numberOfThePage - 1) * numberByPage) / newNumberPage + 1)
    );
    setNumberByPage(newNumberPage);
    setNumberPageTotal(
      [...Array(Math.floor((api.length - 1) / newNumberPage) + 1).keys()].map(
        (x) => ++x
      )
    );
  };

  /*----------------------Affichage----------------------*/

  return (
    <div className="content">
      <h1>Commandes</h1>
      <h2>
        Bienvenue sur notre page web de gestion de commande. Cet outil en ligne
        permet de gérer des commandes de produits ou de services en quelques
        clics. Il permet aussi de gérer l’envoie des commandes au robot.
      </h2>
      <button onClick={append}>append</button>
      <table>
        <thead>
          <tr>
            <th onClick={() => orderData(0, "numero")}>Numero commande</th>
            <th onClick={() => orderData(1, "mail")}>Client</th>
            <th onClick={() => orderData(2, "date")}>Date</th>
            <th onClick={() => orderData(3, "prix")}>Prix</th>
            <th onClick={() => orderData(4, "type")}>Statut</th>
          </tr>
        </thead>
        <tbody>
          <BodyTab api={api} page={numberOfThePage} nbPage={numberByPage} />
        </tbody>
      </table>

      <PageCount api={api} page={numberOfThePage} nbPage={numberByPage} />

      <label>
        Nombre par page :
        <select onChange={(e) => checkpage(e.target.value)}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
        </select>
      </label>
      <p />
      <label>
        Page :
        <select onChange={(e) => setNumberOfThePage(e.target.value)}>
          {numberPageTotal.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <button onClick={pageRemove}>‹</button>
      <button onClick={pageAdd}>›</button>
      <p id="test"></p>
    </div>
  );
}
export default Home;
