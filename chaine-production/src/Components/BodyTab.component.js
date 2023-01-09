import CellTabHome from "./CellTabHome.component";

function BodyTab(props) {
  //slice le tableau pour afficher a partir du nb d'élément sur la page
  return props.api
    .slice(
      (parseInt(props.page) - 1) * parseInt(props.nbPage),
      (parseInt(props.page) - 1) * parseInt(props.nbPage) +
        parseInt(props.nbPage)
    )
    .map((apiData, index) => (
      <CellTabHome key={index} data={apiData} name={index} />
    ));
}

export default BodyTab;
