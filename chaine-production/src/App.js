import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Commande from "./Pages/Commande";
import Error from "./Pages/Error";
import Nav from "./Layout/Header/Nav";
import Test from "./Pages/Test";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* {<Route path="/" element={<Layout />}>}  */}
        {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} /> */}
        <Route path="/commandes" element={<Home />} />
        <Route path="/atraiter" element={<Home />} />
        <Route path="/continuer" element={<Home />} />
        <Route path="/completer" element={<Home />} />
        <Route path="/annulee" element={<Home />} />
        <Route path="/robot" element={<Home />} />

        <Route path="test" element={<Test />} />
        <Route path="commande/:id" element={<Commande />} />
        <Route path="*" element={<Error />} />
        {/* {</Route>} */}
      </Routes>
    </div>
  );
}

export default App;
