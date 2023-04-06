import axios from "axios";
import React, { useState } from "react";

function OrderAccount(props) {
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  //create a dictionaire pour les status
  const status = {
    2: ["blue", "gray", "gray"],
    3: ["blue", "blue", "gray"],
    4: ["blue", "blue", "blue"],
    5: ["gray", "red", "gray"],
  };
  const status_text = {
    2: "La commande est en cours de préparation",
    3: "Le robot traite votre commande",
    4: "Votre commande est prête",
    5: "La commande à été annulée",
  };

  const [api, setApi] = useState([]);
  const [totalprix, setTotalprix] = useState(0);

  function handleClick() {
    const fetchData = async () => {
      axios
        .get("http://projet.local/index/api/commande/" + props.numero_commande)
        .then((response) => {
          if (response.data !== false) {
            if (response.data.length === 0) {
              setApi([]);
            } else if (response.data !== api) {
              setApi(response.data);
              let total = 0;
              response.data.forEach((product) => {
                total += product.prix * product.quantite;
              });
              setTotalprix(total);
            }
          }
        })
        .catch(() => {});
    };
    fetchData();
  }

  return (
    <div className="order-account">
      <div className="status">
        {status[props.status_number].map((color, index) => (
          <div key={index} className={"status-item-" + color}></div>
        ))}
      </div>
      <div className="status-text-div">
        <div className="circles">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
        </div>
        <div className="status-text">
          <p>Statut : {props.status}</p>
          <p className="info-robot">{status_text[props.status_number]}</p>
        </div>
      </div>
      <div className="status-order-infos">
        <h2>Commande #{props.numero_commande}:</h2>
        {
          /*display la date en la convertissant en object sous la forme : Le 22/08 à 12h50*/
          props.date !== null ? (
            <p>
              Le{" "}
              {new Date(props.date)
                .toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "numeric",
                })
                .replace(" ", "/")}{" "}
              à{" "}
              {new Date(props.date)

                .toLocaleTimeString("fr-FR", {
                  hour: "numeric",
                  minute: "numeric",
                })
                .replace(" ", "h")}
            </p>
          ) : (
            <p>Le 00/00 à 00h00</p>
          )
        }
        {isMoreInfo && (
          <>
            <div className="ligne">
              <div></div>
            </div>
            <h2>Produit :</h2>
            {api.map((product) => (
              <div key={product.id} className="infoProduct">
                <p>
                  {product.quantite} x {product.nom}
                </p>
                {/*affiche le prix de chaque produit en le convertissant en int */}
                <p>{product.prix * product.quantite} €</p>
              </div>
            ))}
            <p className="total-price">
              Total : <span>{totalprix} €</span>
            </p>
          </>
        )}
      </div>

      <div
        className="order-infos"
        onClick={() => {
          setIsMoreInfo(!isMoreInfo);
          handleClick();
        }}
      >
        {!isMoreInfo ? (
          <>
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
          </>
        ) : (
          <>
            <p>Moins d'info</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="14"
              viewBox="0 0 24 14"
              fill="none"
            >
              <path
                d="M13.0607 0.93934C12.4749 0.353553 11.5251 0.353553 10.9393 0.93934L1.3934 10.4853C0.807612 11.0711 0.807612 12.0208 1.3934 12.6066C1.97918 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.93934ZM13.5 3V2H10.5V3H13.5Z"
                fill="black"
              />
            </svg>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderAccount;
