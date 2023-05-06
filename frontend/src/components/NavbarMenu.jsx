import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../images/Booklify.png";
// import logob from "../images/Booklify-b.png";
// import { RiAdminFill, RiDashboardFill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
// import { ImBooks } from "react-icons/im";
// import { FaUserFriends} from "react-icons/fa";
// import {  } from "react-icons/io";
import { BsPersonPlus } from "react-icons/bs";
import { TbBooks } from "react-icons/tb";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { BiBookAdd } from "react-icons/bi";
import Offcanvas from "react-bootstrap/Offcanvas";
// import { useEffect } from "react";
import { contextwrap } from "../App";
import { useContext } from "react";

function NavbarMenu() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { pass,pass2 } = useContext(contextwrap);
  const [dash, setdash] = pass;
  const [spec, setspec] = pass2;
  const navto = useNavigate();
  const Logout = () => {
    const user = localStorage.removeItem("user");
    const team = localStorage.removeItem("team");
    navto(user ? "/" : "/");
    navto(team ? "/" : "/");
    setdash(false);
    setspec(false)
    setShow(false);
  };

  return (
    <>
    <Navbar expand="lg"  className={dash === true ? "d-visible navbar-bg" : "d-none navbar-bg"} >
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="logo"
            // className={dash === true ? "d-visible logo" : "d-none logo"}
          />
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center navbar-menu">
          <Nav.Link className={dash === true ? "d-visible" : "d-none"}>
            <button onClick={handleShow} className="btn-menu">
              <RiDashboardFill />
            </button>
          </Nav.Link>

          <Offcanvas
            show={show}
            onHide={handleClose}
            className="offcanvas-menu"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <Button
                  className="p-0"
                  onClick={() => {
                    navto("/");
                    setShow(false);
                  }}
                >
                  <img src={logo} alt="logo" className="logo" />
                </Button>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <ul type="none" className="p-0">
                <li className={spec===true ? "d-none":"d-visible"}>
                  <Button
                    onClick={() => {
                      navto("/books");
                      setShow(false);
                    }}
                  >
                    <TbBooks className="me-2" />
                    Books
                  </Button>
                </li>
                <li className={spec===true ? "d-none":"d-visible"}>
                  <Button
                    onClick={() => {
                      navto("/add-book");
                      setShow(false);
                    }}
                  >
                    <BiBookAdd className="me-2" />
                    Add Book
                  </Button>
                </li>
                <li className={spec===true ? "d-none":"d-visible"}>
                  <Button
                    onClick={() => {
                      navto("/admins");
                      setShow(false);
                    }}
                  >
                    <FiUsers className="me-2" />
                    Admins
                  </Button>
                </li>
                <li className={spec===true ? "d-none":"d-visible"}>
                  <Button
                    onClick={() => {
                      navto("/create-admin");
                      setShow(false);
                    }}
                  >
                    <BsPersonPlus className="me-2" />
                    Create Admin
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      navto("/teams");
                      setShow(false);
                    }}
                  >
                    <FiUsers className="me-2" />
                    Teams
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      navto("/create-team");
                      setShow(false);
                    }}
                  >
                    <BsPersonPlus className="me-2" />
                    CreateTeam
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      navto("/orders");
                      setShow(false);
                    }}
                  >
                    <BsPersonPlus className="me-2" />
                   Orders
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      navto("/placeorder");
                      setShow(false);
                    }}
                  >
                    <BsPersonPlus className="me-2" />
                    PlaceOrder
                  </Button>
                </li>
                <li className="logout">
                  <Button className="btn" onClick={Logout}>
                    <FiLogOut className="me-2" />
                    Logout
                  </Button>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
}

export default NavbarMenu;
