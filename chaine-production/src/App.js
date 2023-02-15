import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Test from "./Pages/Test";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* {<Route path="/" element={<Layout />}>}  */}
        {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/product/:id" element={<Home />} />
        <Route path="/order" element={<Home />} />
        <Route path="/account" element={<Home />} />

        <Route path="test" element={<Test />} />
        <Route path="*" element={<Error />} />
        {/* {</Route>} */}
      </Routes>
    </div>
  );
}

export default App;
