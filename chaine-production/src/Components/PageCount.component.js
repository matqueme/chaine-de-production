function PageCount(props) {
  //calcul du nombre d'élément par page
  const nbByPage = () => {
    return (
      parseInt(props.page - 1) * parseInt(props.nbPage) + parseInt(props.nbPage)
    );
  };

  //calcul du nombre de page total
  const nbOfPage = () => {
    return Math.floor((props.api.length - 1) / props.nbPage) + 1;
  };

  return (
    <p>
      {" "}
      {parseInt(props.page - 1) * parseInt(props.nbPage) + 1}-
      {nbByPage() < props.api.length ? nbByPage() : props.api.length} sur{" "}
      {nbOfPage()} {nbOfPage() > 1 ? "pages" : "page"}
    </p>
  );
}
export default PageCount;
