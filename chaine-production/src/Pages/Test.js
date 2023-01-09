const Test = () => {
  const checkpage = (params) => {
    console.log(params);
  };
  return (
    <label>
      Nombre par page :
      <select
        onChange={(e) => {
          checkpage(e.target.value);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
      </select>
    </label>
  );
};

export default Test;
