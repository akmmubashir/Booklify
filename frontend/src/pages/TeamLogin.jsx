import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import logo from "../images/Booklify.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  loginteam } from "../url";
import { useContext } from "react";
import { contextwrap } from "../App";
import Modal from "react-bootstrap/Modal";

function TeamLogin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [replye, setreplye] = useState(false);
  const [replys, setreplys] = useState(false);
  const [replyf, setreplyf] = useState(false);
  const navto = useNavigate();
  const { pass,pass2 } = useContext(contextwrap);
  const [dash, setdash] = pass;
  const [spec, setspec] = pass2;
  console.log(dash);
  console.log(spec);

  useEffect(() => {
    const exist = JSON.parse(localStorage.getItem("team"));
    if (exist) {
      setspec(true);
      setdash(true);
      setTimeout(() => {
        navto("/dashboard");
      }, 2000);
      //   navto("/dashboard");
      //  setdash(true);
    }
  });

  const Submit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      // alert("Enter all datas");
      setreplye(true);
      setTimeout(() => {
        setreplye(false);
      }, 2000);
    } else {
      axios.post(loginteam, { email, password }).then((res) => {
        let error = res.data.isError;
        if (error) {
          console.log("Error");
          // alert("Wrong Details");
          setreplyf(true);
          setTimeout(() => {
            setreplyf(false);
          }, 2000);
        } else {
          setreplys(true);
          setTimeout(() => {
            localStorage.setItem("team", JSON.stringify(res.data));
            console.log(res.data);
            setspec(true);
            setdash(true);
            const team = localStorage.getItem("team");
            navto(team ? "/dashboard" : "/");
          }, 2000);
        }
      });
    }
  };

  return (
    <div className="dash">
      <Form>
      <h1>Teams Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-white">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-white">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mt-4">
          <Button className="form-btn" onClick={Submit}>
            Submit
          </Button>
        </Form.Group>
      </Form>
      <Modal show={replys} centered>
        <Modal.Body className="bg-success">
          <h6>Login Successful</h6>
        </Modal.Body>
      </Modal>
      <Modal show={replyf} centered>
        <Modal.Body className="bg-danger">
          <h6>Wrong Credentials</h6>
        </Modal.Body>
      </Modal>
      <Modal show={replye} centered className="warning">
        <Modal.Body className="bg-warning ">
          <h6>Enter all field</h6>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TeamLogin;
