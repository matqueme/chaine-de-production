import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../Components/UserCard.component";
import "./AllAccount.scss";
import { useNavigate } from "react-router-dom";

const AllAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //cors origin
      const result = await axios("http://projet.local/index/api/users");
      setAccounts(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const retour = () => {
    navigate("signin");
  };

  return (
    <div className="accounts">
      <h2 className="title">Utilisateurs</h2>
      <h3 className="title">Liste de tous les utilisateurs</h3>
      <button onClick={retour}>Retour</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="accountList">
          {accounts.map((account) => (
            <UserCard key={account.mail} account={account} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAccount;
