import { Link } from "react-router-dom";
import { useState } from "react";
import NameWebsite from "../Components/NameWesite.component";
import axios from "axios";
import "./Sign.scss";

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
  const [success, setSuccess] = useState("");

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
            setSuccess("Votre compte a bien été créé");
            e.target.reset();
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
    <div className="sign">
      <div className="signchild">
        <NameWebsite />
        <h2>Inscription</h2>
        <h3>Créez un compte pour accéder à toutes nos fonctionnalités.</h3>

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
              className={mail === "" ? "empty" : ""}
            />

            <label htmlFor="passwordField">Mot de passe</label>
            <input
              type="password"
              id="passwordField"
              name="passwordField"
              onChange={(e) => setPassword(e.target.value)}
              required="required"
              autoComplete="off"
              className={password === "" ? "empty" : ""}
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
              className={passwordConfirmation === "" ? "empty" : ""}
            />

            <input type="submit" value="Inscription" className="submitButton" />
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
              className={lastName === "" ? "empty" : ""}
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
              className={firstName === "" ? "empty" : ""}
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
              className={address === "" ? "empty" : ""}
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
              className={zipCode === "" ? "empty" : ""}
            />

            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              name="city"
              autoComplete="off"
              required="required"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              className={city === "" ? "empty" : ""}
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
              className={phone === "" ? "empty" : ""}
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
              className={age === "" ? "empty" : ""}
            />

            <input type="submit" value="Inscription" className="submitButton" />
          </form>
        )}
        <p className="error">{error}</p>
        <p className="success">{success}</p>
        <p className="changeConnect">
          Déja inscrit ?&nbsp;<Link to={"../signin"}>Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
