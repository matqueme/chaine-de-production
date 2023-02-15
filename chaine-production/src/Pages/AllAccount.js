import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.chaine-production.com/accounts");

      setAccounts(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Accounts</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              <Link to={`/account/${account.id}`}>{account.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllAccount;
