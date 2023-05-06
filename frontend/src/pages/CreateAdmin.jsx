import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import logo from "../images/Booklify.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signupdata } from "../url";
import { contextwrap } from "../App";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";

function CreateAdmin() {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [role, setrole] = useState("");
  const [status, setstatus] = useState("");
  const [password, setpassword] = useState("");
  const [replye, setreplye] = useState(false);
  const [replys, setreplys] = useState(false);
  const [replyf, setreplyf] = useState(false);
  const navto = useNavigate();
  const { pass } = useContext(contextwrap);
  const [dash, setdash] = pass;
  console.log(dash);

  const Submit = () => {
    if (
      !name ||
      !email ||
      !password ||
      !status ||
      !role ||
      !phone ||
      !username
    ) {
      setreplye(true);
      setTimeout(() => {
        setreplye(false);
      }, 2000);
    } else {
      axios
        .post(signupdata, {
          name,
          username,
          role,
          status,
          email,
          phone,
          password,
        })
        .then((res) => {
          let error = res.data.isError;
          if (error) {
            console.log("Error");
            setreplyf(true);
            setTimeout(() => {
              setreplyf(false);
            }, 2000);
          } else {
            // localStorage.setItem("user", JSON.stringify(res.data));
            // console.log(res.data);
            setdash(true);
            // const user = localStorage.getItem("user");
            setreplys(true);
            setTimeout(() => {
              // navto(user ? "/admins" : "/admin-login");
              navto("/admins");
            }, 2000);
          }
        });
    }
  };
  return (
    <>
      <Form className="row create-form">
        <div className="col-12">
          {/* <img src={logo} alt="logo" className="w-25 mb-3" /> */}
          <h1>Add Client</h1>
        </div>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicText">
          <Form.Label className="text-white">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicText">
          <Form.Label className="text-white">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
          <Form.Label className="text-white">Role</Form.Label>
          <Form.Select
            type="select"
            onChange={(e) => {
              setrole(e.target.value);
            }}
          >
            <option>Select role</option>
            <option>Admin</option>
            <option>Super Admin</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
          <Form.Label className="text-white">Signin status</Form.Label>
          <br />
          <Form.Check
            inline
            type="radio"
            name="status"
            label="Signed in"
            value={"Signed in"}
            onChange={(e) => {
              setstatus(e.target.value);
            }}
          />
          <Form.Check
            inline
            type="radio"
            label="Not signed in"
            value={"Not signed in"}
            name="status"
            onChange={(e) => {
              setstatus(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
          <Form.Label className="text-white">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicNumber">
          <Form.Label className="text-white">Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
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
          <h6>Successfully added Admin</h6>
        </Modal.Body>
      </Modal>
      <Modal show={replyf} centered>
        <Modal.Body className="bg-danger">
          <h6>Already registered user</h6>
        </Modal.Body>
      </Modal>
      <Modal show={replye} centered className="warning">
        <Modal.Body className="bg-warning ">
          <h6>Enter all field</h6>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateAdmin;
