import { useEffect, useState } from "react";

const Test = () => {
  const [page, setPage] = useState([10, 20, 30, 40, 50]);

  const checkpage = (params) => {
    console.log(params);
  };

  useEffect(() => {
    console.log("test");
  }, []);

  return (
    <label>
      Nombre par page :
      <select
        onChange={(e) => {
          checkpage(e.target.value);
        }}
      >
        {page.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Test;
