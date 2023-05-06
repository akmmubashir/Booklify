import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { addBookdata } from "../url";
import Form from "react-bootstrap/Form";
// import logo from "../images/Booklify.png";
import Modal from "react-bootstrap/Modal";

function AddBooks() {
  const [bookname, setbookname] = useState("");
  const [author, setauthor] = useState("");
  const [publication, setpublication] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [replye, setreplye] = useState(false);
  const [replys, setreplys] = useState(false);
  const [replyf, setreplyf] = useState(false);
  const navto = useNavigate();

  const Submit = () => {
    if (
      !bookname ||
      !author ||
      !publication ||
      !category ||
      !price ||
      !description
    ) {
      setreplye(true);
      setTimeout(() => {
        setreplye(false);
      }, 2000);
    } else {
      axios
        .post(addBookdata, {
          bookname,
          author,
          publication,
          category,
          price,
          description,
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
              navto("/books");
            }, 2000);
          }
        });
    }
  };

  return (
    <>
      <Form className="row create-form">
        <div>
          <h1>Add Book</h1>
        </div>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Book Name"
            onChange={(e) => {
              setbookname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            onChange={(e) => {
              setauthor(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Publications</Form.Label>
          <Form.Control
            type="text"
            placeholder="Publications"
            onChange={(e) => {
              setpublication(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Category</Form.Label>
          <Form.Select
            type="select"
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          >
            <option>Select Category</option>
            <option>War</option>
            <option>Love</option>
            <option>Self Motivation</option>
            <option>Biography</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a short description about the book"
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-lg-6">
          <Form.Label className="text-white">Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            onChange={(e) => {
              setprice(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mt-4">
          <Button className="form-btn" onClick={Submit}>
            Submit
          </Button>
        </Form.Group>
      </Form>
      <Modal show={replys} centered >
        <Modal.Body className="bg-success">
          <h6>Book successfully added</h6>
        </Modal.Body>
      </Modal>
      <Modal show={replyf} centered>
        <Modal.Body className="bg-danger">
          <h6>Book Details already exists</h6>
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

export default AddBooks;
