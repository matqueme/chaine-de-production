import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SignUp = () => {
  const [isSetMail, setIsSetMail] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordPatternMajuscule = /[A-Z]/;
    const passwordPatternChiffre = /[0-9]/;
    const passwordPatternSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (emailPattern.test(mail) === false) {
      setError("L'adresse e-mail n'est pas valide");
    } else if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
    } else if (passwordPatternMajuscule.test(password) === false) {
      setError("Le mot de passe doit contenir au moins une majuscule");
    } else if (passwordPatternChiffre.test(password) === false) {
      setError("Le mot de passe doit contenir au moins un chiffre");
    } else if (passwordPatternSpecial.test(password) === false) {
      setError("Le mot de passe doit contenir au moins un caractère spécial");
    } else if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      //start an axios request POST
      let data = new FormData();
      data.append("mail", mail);
      data.append("nom", lastName);
      data.append("prenom", firstName);
      data.append("pwd", password);
      data.append("adresse", address + " " + zipCode + " " + city);
      data.append("age", age);
      data.append("telephone", phone);

      axios
        .post("http://projet.local/index/api/addUser", data)
        .then((response) => {
          if (response.data === "error") {
            setError("L'adresse e-mail n'est pas valide");
          } else if (response.data === "success") {
            setError("Votre compte a bien été créé");
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (isSetMail === false) {
      setIsSetMail(true);
      setError("");
      e.target.reset();
    }
  };
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
          strokeWidth="3.5"
        />
        <path
          d="M9.6255,5c1.4-2.7,2.3-3.5,4.5-4"
          fill="none"
          stroke="#003171"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M37.3255,11.2c.7,2.1,.6,3.4-.3,5.8"
          fill="none"
          stroke="#003171"
          strokeLinecap="round"
          strokeWidth="2"
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
      <h2>Insciption</h2>
      <h3>Créer un compte pour accéder a toutes nos fonctionnalités.</h3>

      {isSetMail ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setMail(e.target.value)}
            required="required"
            autoComplete="off"
          />

          <label htmlFor="passwordField">Mot de passe</label>
          <input
            type="password"
            id="passwordField"
            name="passwordField"
            onChange={(e) => setPassword(e.target.value)}
            required="required"
            autoComplete="off"
          />

          <label htmlFor="passwordConfirmation">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required="required"
            autoComplete="off"
          />

          <input type="submit" value="Inscription" />
        </form>
      ) : (
        <form onSubmit={handleSubmit2}>
          <label htmlFor="lname">Nom</label>
          <input
            type="text"
            id="lname"
            name="lname"
            required="required"
            autoComplete="off"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <label htmlFor="fname">Prénom</label>
          <input
            type="text"
            id="fname"
            name="fname"
            required="required"
            autoComplete="off"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />

          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            id="address"
            name="address"
            required="required"
            autoComplete="off"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <label htmlFor="zipcode">Code Postal</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            autoComplete="off"
            required="required"
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
          />

          <label htmlFor="postalCode">Ville</label>
          <input
            type="text"
            id="city"
            name="city"
            autoComplete="off"
            required="required"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />

          <label htmlFor="phone">Téléphone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            autoComplete="off"
            required="required"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />

          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            autoComplete="off"
            required="required"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />

          <input type="submit" value="Inscription" />
        </form>
      )}
      <p>{error}</p>
      <p>
        Déja inscrit ? <Link to={"../signin"}>Connectez-vous</Link>
      </p>
    </div>
  );
};

export default SignUp;
