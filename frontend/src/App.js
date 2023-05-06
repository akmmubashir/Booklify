import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarMenu from "./components/NavbarMenu";
// import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import CreateAdmin from "./pages/CreateAdmin";
import Admins from "./pages/Admins";
import Books from "./pages/Books";
import Dashboard from "./pages/Dashboard";
import { createContext, useEffect } from "react";
import { useState } from "react";
import Edit from "./pages/Edit";
import AddBooks from "./pages/AddBooks";
import v1 from "../src/images/vectors/1.png";
import v2 from "../src/images/vectors/2.png";
import v3 from "../src/images/vectors/3.png";
import v4 from "../src/images/vectors/4.png";
import v5 from "../src/images/vectors/5.png";
import vr from "../src/images/vectors/vr.png";
import vd1 from "../src/images/vectors/vd1.png";
import vd2 from "../src/images/vectors/vd2.png";
import View from "./pages/View";
import Teams from "./pages/Teams";
import TeamCreate from "./pages/TeamCreate";
import TeamLogin from "./pages/TeamLogin";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

const contextwrap = createContext();

function App() {
  const [dash, setdash] = useState(false);
  const [spec, setspec] = useState(false);
  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("user"));
    if (exist) {
      setdash(true);
    }
  }, []);
  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("team"));
    if (exist) {
      setdash(true);
      setspec(true)
    }
  }, []);
  return (
    <contextwrap.Provider
      value={{
        pass: [dash, setdash],
        pass2: [spec, setspec],
      }}
    >
      <div className="vector">
        <img src={v1} className="v1" alt="v1" />
        <img src={v2} className="v2" alt="v2" />
        <img src={v3} className="v3" alt="v3" />
        <img src={v4} className="v4" alt="v4" />
        <img src={v5} className="v5" alt="v5" />
        <img src={vr} className="vr" alt="vr" />
        <img src={vd1} className="vd1" alt="vd1" />
        <img src={vd2} className="vd2" alt="vd2" />
      </div>{" "}
      <BrowserRouter>
        <NavbarMenu />
        <div className="container-fluid secp">
          <Routes>
            {" "}
            {/* <Route path="/Home" element={<Home />} /> */}{" "}
            <Route path="/" element={<Login />} />{" "}
            <Route path="/admin-login" element={<AdminLogin />} />{" "}
            <Route path="/admins" element={<Admins />} />{" "}
            <Route path="/create-admin" element={<CreateAdmin />} />{" "}
            <Route path="/teams" element={<Teams />} />{" "}
            <Route path="/create-team" element={<TeamCreate />} />{" "}
            <Route path="/team-login" element={<TeamLogin />} />{" "}
            <Route path="/books" element={<Books />} />{" "}
            <Route path="/edit/:id" element={<Edit />} />{" "}
            <Route path="/view/:id" element={<View />} />{" "}
            <Route path="/add-book" element={<AddBooks />} />{" "}
            <Route path="/dashboard" element={<Dashboard />} />{" "}
            <Route path="/placeorder" element={<PlaceOrder />} />{" "}
            <Route path="/orders" element={<Orders />} />{" "}
            <Route path="/order-details/:id" element={<OrderDetails />} />{" "}
          </Routes>{" "}
        </div>{" "}
      </BrowserRouter>{" "}
    </contextwrap.Provider>
  );
}

export default App;
export { contextwrap };
