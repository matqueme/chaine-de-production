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

  /*----------------------Affichage----------------------*/

  return (
    <div className="content">
      <h1>Commandes</h1>
      <h2>Commande</h2>
    </div>
  );
}
export default Home;
