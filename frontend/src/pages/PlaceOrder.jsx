import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { displaybooksdata, placeOrder } from "../url";
import Form from "react-bootstrap/Form";
// import logo from "../images/Booklify.png";
import Modal from "react-bootstrap/Modal";

function PlaceOrder() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState("");
  const [alterphone, setalterphone] = useState("");
  const [product, setproduct] = useState("");
  const [buymode, setbuymode] = useState("");
  const [delivery, setdelivery] = useState("");
  const [countryD, setcountryD] = useState([]);
  const [booksD, setbooksD] = useState([]);
  const [replye, setreplye] = useState(false);
  const [replys, setreplys] = useState(false);
  const [replyf, setreplyf] = useState(false);
  const navto = useNavigate();

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
      setcountryD(res.data);
      // console.log(res.data.name.common);
    });
  }, []);
  useEffect(() => {
    axios.get(displaybooksdata).then((res) => {
      setbooksD(res.data);
    });
  }, []);

  const Submit = () => {
    if (
      !name ||
      !email ||
      !address ||
      !country ||
      !pincode ||
      !phone ||
      !alterphone ||
      !product ||
      !buymode ||
      !delivery
    ) {
      setreplye(true);
      setTimeout(() => {
        setreplye(false);
      }, 2000);
    } else {
      axios
        .post(placeOrder, {
          name,
          email,
          address,
          country,
          pincode,
          phone,
          alterphone,
          product,
          buymode,
          delivery,
        })
        .then((res) => {
          console.log(res);
          let error = res.data.isError;

          if (error) {
            console.log("Error");
            setreplyf(true);
            setTimeout(() => {
              setreplyf(false);
            }, 2000);
          } else {
            setreplys(true);
            setTimeout(() => {
              navto("/orders");
            }, 2000);
          }
        });
    }
  };

  return (
    <>
      <Form className="row create-form">
        <div>
          <h1>Place your order</h1>
        </div>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Product</Form.Label>
          <Form.Select
            type="select"
            onChange={(e) => {
              setproduct(e.target.value);
            }}
          >
            {booksD.map((select) => {
              return (
                <>
                  <option>{select.bookname}</option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">
            Alternative Phone Number
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setalterphone(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Delivery Type</Form.Label>
          <Form.Select
            type="select"
            onChange={(e) => {
              setdelivery(e.target.value);
            }}
          >
            <option>Select Type</option>
            <option>Home</option>
            <option>Office</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Enter delivery address"
            onChange={(e) => {
              setaddress(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Country</Form.Label>
          <Form.Select
            type="select"
            onChange={(e) => {
              setcountry(e.target.value);
            }}
          >
            {countryD.map((select) => {
              return (
                <>
                  {/* <option>Select Country</option> */}
                  <option>{select.name.common}</option>
                </>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">pincode</Form.Label>
          <Form.Control
            type="number"
            placeholder="pincode"
            onChange={(e) => {
              setpincode(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
          <Form.Label className="text-white">Payment Type</Form.Label>
          <br />
          <Form.Check
            inline
            type="radio"
            name="buymode"
            label="Cash on delivery"
            value={"Cash on delivery"}
            onChange={(e) => {
              setbuymode(e.target.value);
            }}
          />
          <Form.Check
            inline
            type="radio"
            label="Online payment"
            value={"Online payment"}
            name="buymode"
            onChange={(e) => {
              setbuymode(e.target.value);
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
          <h6>Order Placed</h6>
        </Modal.Body>
      </Modal>
      <Modal show={replyf} centered>
        <Modal.Body className="bg-danger">
          <h6>Order already in progress</h6>
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

export default PlaceOrder;
