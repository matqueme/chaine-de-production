import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Nav from "./Layout/Header/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* {<Route path="/" element={<Layout />}>}  */}
        {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        {/* {</Route>} */}
      </Routes>
    </div>
  );
}

export default App;
