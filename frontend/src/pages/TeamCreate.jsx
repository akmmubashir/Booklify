import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import logo from "../images/Booklify.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signupteam } from "../url";
import { contextwrap } from "../App";
import { useContext } from "react";
import Modal from "react-bootstrap/Modal";

function TeamCreate() {
  const [firmname, setfirmname] = useState("");
  const [employeename, setemployeename] = useState("");
  const [firmaddress, setfirmaddress] = useState("");
  const [employeeaddress, setemployeeaddress] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [alterphone, setalterphone] = useState("");
  const [description, setdescription] = useState("");
  const [position, setposition] = useState("");
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
      !employeename ||
      !firmname ||
      !email ||
      !password ||
      !firmaddress ||
      !employeeaddress ||
      !phone ||
      !alterphone ||
      !description ||
      !position
    ) {
      setreplye(true);
      setTimeout(() => {
        setreplye(false);
      }, 2000);
    } else {
      axios
        .post(signupteam, {
          email,
          firmname,
          employeename,
          firmaddress,
          employeeaddress,
          phone,
          alterphone,
          description,
          position,
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
            console.log(res.data);
            setdash(true);
            // const user = localStorage.getItem("user");
            setreplys(true);
            setTimeout(() => {
              // navto(user ? "/teams" : "/team-login");
              navto("/teams");
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
          <h1>Add Team</h1>
        </div>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicText">
          <Form.Label className="text-white">Firm Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firm name"
            onChange={(e) => {
              setfirmname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicText">
          <Form.Label className="text-white">Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your employee name"
            onChange={(e) => {
              setemployeename(e.target.value);
            }}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
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
        </Form.Group> */}
        {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
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
        </Form.Group> */}
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Firm Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Enter firm address"
            onChange={(e) => {
              setfirmaddress(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Employee Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Enter employee address"
            onChange={(e) => {
              setemployeeaddress(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
          <Form.Label className="text-white">Position</Form.Label>
          <Form.Select
            type="select"
            onChange={(e) => {
              setposition(e.target.value);
            }}
          >
            <option>Select Position</option>
            <option>Sr Developer</option>
            <option>Jr Developer</option>
            <option>Sr Designer</option>
            <option>Jr Designer</option>
            <option>Team Lead</option>
            <option>Tester</option>
          </Form.Select>
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
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicNumber">
          <Form.Label className="text-white">
            Alternative Phone Number
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your alternative phone number"
            onChange={(e) => {
              setalterphone(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter a short description about the book"
            onChange={(e) => {
              setdescription(e.target.value);
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

export default TeamCreate;
