function OrderAccount() {
  return (
    <div className="order-account">
      <p className="time">
        Temps estimé : <span>3 min</span>
      </p>
      <div className="status">
        <div className="status-item-blue"></div>
        <div className="status-item-blue"></div>
        <div className="status-item-gray"></div>
      </div>
      <div className="status-text-div">
        <div className="circles">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
        </div>
        <div className="status-text">
          <p>Status : En cours</p>
          <p className="info-robot">Le robot traite votre commande</p>
        </div>
      </div>
      <div className="status-order-infos">
        <h2>Commande #4153455 :</h2>
        <p>Le 25/03 à 12h12</p>
      </div>
      <div className="order-infos">
        <p>Plus d'info</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
        >
          <path
            d="M10.9393 13.0607C11.5251 13.6464 12.4749 13.6464 13.0607 13.0607L22.6066 3.51472C23.1924 2.92893 23.1924 1.97918 22.6066 1.3934C22.0208 0.807612 21.0711 0.807612 20.4853 1.3934L12 9.87868L3.51472 1.3934C2.92893 0.807612 1.97918 0.807612 1.3934 1.3934C0.807612 1.97918 0.807612 2.92893 1.3934 3.51472L10.9393 13.0607ZM10.5 11V12H13.5V11H10.5Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}

export default OrderAccount;
