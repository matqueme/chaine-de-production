import { useNavigate, useLocation } from "react-router-dom";

function OrderBar(price) {
  const navigate = useNavigate();
  const location = useLocation();

  //return the view of the component with the price and a buttun to order
  return (
    <div className="orderBar">
      <div className="price">
        <svg
          data-name="Panier"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 276.9 327.46"
        >
          <path d="M62.68,79.82C59.13,36.11,93.09,4.25,130.13,.46c23.14-2.36,43.46,4.33,60.39,20.29,16.81,15.85,24.32,35.75,23.79,59.06,6.71,0,13.04-.01,19.37,0,17.3,.04,28.69,11.13,29.82,28.37,1.98,30.24,4.29,60.46,6.44,90.7,1.86,26.13,3.7,52.25,5.53,78.38,.52,7.46,1.3,14.93,1.42,22.4,.18,11.95-7.74,22.77-19.13,26.24-3.4,1.04-7.11,1.48-10.68,1.49-72.48,.08-144.96,.08-217.45,.05-18.41,0-30.66-12.63-29.58-30.94,1.3-22.16,3.09-44.29,4.68-66.44,1.64-22.89,3.3-45.78,4.94-68.67,1.31-18.41,2.43-36.84,3.95-55.24,1.3-15.8,13.05-26.26,29.02-26.33,6.58-.03,13.15,0,20.03,0Zm.67,23.97c-7.56,0-14.54-.04-21.51,.02-2.92,.02-4.19,1.83-4.38,4.56-1.02,14.43-2.04,28.86-3.06,43.29-1.6,22.52-3.19,45.04-4.81,67.55-1.86,26-3.77,52-5.6,78-.35,4.96,.95,6.28,5.92,6.28,72.35,.01,144.71,.01,217.06,0,5.01,0,6.31-1.3,5.97-6.23-1.27-18.54-2.62-37.07-3.95-55.61-2.16-30.1-4.32-60.21-6.48-90.31-1.02-14.31-2.03-28.61-3.04-42.92-.18-2.53-1.24-4.51-3.97-4.56-6.95-.14-13.9-.05-21.24-.05,0,1.84,0,3.31,0,4.77,0,18.34,0,36.68-.02,55.02,0,5.31-2.64,9.06-7.4,11.12-4.55,1.97-8.83,.99-12.52-2.24-3.15-2.75-4.03-6.42-4.03-10.46,.04-17.97,.01-35.93,.01-53.9,0-1.33,0-2.66,0-4.08H86.61c0,1.75,0,3.24,0,4.72,0,17.72,.02,35.43-.01,53.15-.02,8.24-4.91,13.75-12.07,13.73-7.18-.02-11.98-5.61-11.83-13.81,.2-11.1,.48-22.2,.62-33.31,.1-8.09,.02-16.17,.02-24.74Zm126.52-24.16c2.86-17.36-7.76-38.05-24.68-48.31-17.84-10.82-40.79-9.63-57.71,2.83-15.48,11.4-22.88,31.49-20.27,45.48h102.66Z" />
        </svg>
        <p>Total : {price.price} €</p>
      </div>
      <button
        onClick={() => navigate(`/order/`, { state: { background: location } })}
      >
        Commander
      </button>
    </div>
  );
}

export default OrderBar;
