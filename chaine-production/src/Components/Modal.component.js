import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./Modal.scss";
function Modal() {
  const navigate = useNavigate();
  const location = useLocation();

  //composant est monté on bloque le scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  //composant est démonté on débloque le scroll
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="modalDiv">
      <div className="modal">
        <h3>Modal {location.pathname}</h3>
        <button onClick={() => navigate("/")}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
