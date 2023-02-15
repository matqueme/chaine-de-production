import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <svg
        id="Calque_1"
        data-name="Calque 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 38.7848 44.6739"
      >
        <path
          d="M25.2255,5.9c-4.6-2.1-8.9-2.8-9.5-1.5-.1,.3,0,.7,.3,1.2v.1c-1.2,.7-2.5,.7-3.3,2.3-.7,1.6-10.8,24.3-10.8,24.3-.5,1.1,.1,2.4,1.4,3.8-1,2.2,12.7,8.7,13.8,6.3,1.7,0,2.9-.4,3.5-1.6l11-24.2c.8-1.7,.1-2.3-.1-3.9h0c.6-.1,1-.3,1.2-.6,.5-1.3-2.8-4-7.5-6.2Zm5.5,3.9c-.2,.4-3.1-.6-6.4-2.1-3.4-1.6-5.9-3.2-5.8-3.6,.2-.4,3,.6,6.4,2.1,3.4,1.6,5.9,3.2,5.8,3.6Z"
          fill="#003171"
          stroke="#003171"
          stroke-width="3.5"
        />
        <path
          d="M9.6255,5c1.4-2.7,2.3-3.5,4.5-4"
          fill="none"
          stroke="#003171"
          stroke-linecap="round"
          stroke-width="2"
        />
        <path
          d="M37.3255,11.2c.7,2.1,.6,3.4-.3,5.8"
          fill="none"
          stroke="#003171"
          stroke-linecap="round"
          stroke-width="2"
        />
        <path
          d="M30.9255,14.6h0c.9-.2,1.6,.7,1.2,1.5l-11.6,25.2c-.1,.3-.5,.5-.8,.6l-1.6,.2L30.9255,14.6Z"
          fill="#fff"
        />
        <path
          d="M30.7255,9.8c-.2,.4-3.1-.6-6.4-2.1-3.4-1.6-5.9-3.2-5.8-3.6,.2-.4,3,.6,6.4,2.1,3.4,1.6,5.9,3.2,5.8,3.6Z"
          fill="#fff"
        />
      </svg>
      <h1>AutoBar</h1>
      <h2>Connexion</h2>
      <h3>Entrez vos informations de connexion pour accéder a votre compte.</h3>

      <form>
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" />

        <input type="submit" value="Connexion" />
      </form>
      <p>
        Pas encore membre ?<Link to={"./signup"}>Inscrivez-vous</Link>
      </p>
    </div>
  );
};

export default SignIn;
