import { useNavigate } from "react-router-dom";

function CellTabHome(props) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/commande/" + props.data.numero);
  };

  return (
    <tr onClick={handleOnClick}>
      <td>{props.data.numero}</td>
      <td>{props.data.mail}</td>
      <td>{props.data.date}</td>
      <td className="price">{props.data.prix}</td>
      <td>
        <div className="typeTab">
          <div>{props.data.type}</div>
        </div>
      </td>
    </tr>
  );
}

export default CellTabHome;
