import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Test from "./Pages/Test";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Account from "./Pages/Account";
import AllAccount from "./Pages/AllAccount";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* {<Route path="/" element={<Layout />}>}  */}
        {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<Home />} />
        <Route path="/order" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/allaccount" element={<AllAccount />} />

        <Route path="test" element={<Test />} />
        <Route path="*" element={<Error />} />
        {/* {</Route>} */}
      </Routes>
    </div>
  );
}

export default App;
