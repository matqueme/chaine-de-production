import CellTabHome from "../Components/cellTabHome.component";
import { useState } from "react";

function Home() {
  const [api, setApi] = useState([
    {
      numero: "563834",
      date: "2023-01-05 19:12:02",
      mail: "pierre.dupont@gmail.com",
      type: "Non traitee",
    },
    {
      numero: "234569",
      date: "2023-01-03 18:15:02",
      mail: "agathe.lorn@gmail.com",
      type: "En cours",
    },
    {
      numero: "611111",
      date: "2023-01-03 18:18:02",
      mail: "testl.lorn@gmail.com",
      type: "En cours",
    },
    {
      numero: "211111",
      date: "2023-01-03 18:18:02",
      mail: "testl.lorn@gmail.com",
      type: "En cours",
    },
  ]);

  //Pour trier les colonne pour savoir si on clique sur la même ou pas
  const [colomnSort, setColomnSort] = useState(3);
  //Pour savoir comment on trie les colonnes (croissant/decroissant)
  const [orientationSort, setOrientationSort] = useState(1);

  //A chaque clique
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

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => orderData(0, "numero")}>Numero commande</th>
          <th onClick={() => orderData(2, "date")}>Date</th>
          <th onClick={() => orderData(2, "mail")}>Client</th>
          <th onClick={() => orderData(3, "type")}>Statut</th>
        </tr>
      </thead>
      <tbody>
        {api.map((apiData, index) => (
          <CellTabHome key={index} data={apiData} name={index} />
        ))}
      </tbody>
    </table>
  );
}
export default Home;
