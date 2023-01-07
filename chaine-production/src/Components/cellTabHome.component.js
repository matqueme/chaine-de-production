import { useNavigate } from "react-router-dom";

function CellTabHome(props) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/commande/" + props.data.numero);
  };

  return (
    <tr onClick={handleOnClick}>
      <td>{props.data.numero}</td>
      <td>{props.data.date}</td>
      <td>{props.data.mail}</td>
      <td>{props.data.type}</td>
    </tr>
  );
}

export default CellTabHome;
