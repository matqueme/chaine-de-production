import { useEffect } from "react";

const Test = () => {
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
      ></select>
    </label>
  );
};

export default Test;
