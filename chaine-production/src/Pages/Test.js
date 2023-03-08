import React, { useState, useEffect } from "react";

function Test() {
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer = null;
    const resetTimer = () => {
      setIsActive(true);
      setShowModal(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsActive(false);
        setShowModal(true);
      }, 15000); // délai de 15 secondes avant d'afficher le modal
    };

    resetTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchmove", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchmove", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      const timer = setTimeout(() => {
        console.log("redirect");
      }, 10000); // délai de 5 secondes avant de rediriger l'utilisateur
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleReactivate = () => {
    setIsActive(true);
    setShowModal(false);
  };

  return (
    <>
      {isActive ? <div>Contenu de la page</div> : <div>Page désactivée</div>}
      {showModal && (
        <div>
          <div>La page est inactive depuis plus de 15 secondes.</div>
          <div>Vous allez être redirigé vers la page d'accueil dans 10s.</div>
          <button onClick={handleReactivate}>Réactiver la page</button>
        </div>
      )}
    </>
  );
}

export default Test;
