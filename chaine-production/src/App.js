import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Test from "./Pages/Test";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Account from "./Pages/Account";
import AllAccount from "./Pages/AllAccount";
import { useLocation } from "react-router-dom";
import Modal from "./Components/Modal.component";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<Home />}>
          <Route path="/product/:id" element={<Modal />} />
          <Route path="/order" element={<Modal />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/order" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/allaccount" element={<AllAccount />} />

        <Route path="test" element={<Test />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/product/:id" element={<Modal />} />
          <Route path="/order" element={<Modal />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
