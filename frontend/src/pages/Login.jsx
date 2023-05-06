import React, { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import TeamLogin from "./TeamLogin";
import logo from "../images/Booklify.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navto = useNavigate();
  const [switcher, setswitcher] = useState(false);
  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("team"));
    if (exist) {
      setTimeout(() => {
        navto("/dashboard");
      }, 2000);
    }
  });

  return (
    <>
      <div className="row">
        <div className="col-12 text-center">
          <img
            src={logo}
            alt="logo"
            className="mb-3"
            style={{ width: "20%" }}
          />
          <br />
          <br />
          <button
            className="btn form-btn"
            onClick={() => setswitcher((e) => !e)}
          >
            {switcher ? "Switch to Admin Login" : "Switch to Team Login"}
          </button>
        </div>
        <div className="col-12">
          {switcher ? <TeamLogin /> : <AdminLogin />}
        </div>
      </div>
    </>
  );
}

export default Login;
