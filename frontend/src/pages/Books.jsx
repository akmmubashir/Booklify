import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { displaybooksdata } from "../url";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Books() {
  const [booksD, setbooksD] = useState([]);
  const [show, setShow] = useState(false);
  const [reply, setreply] = useState(false);
  const [idconf, setidconf] = useState("");
  // display start
  useEffect(() => {
    axios.get(displaybooksdata).then((res) => {
      setbooksD(res.data);
    });
  }, []);
  // display end

  // delete start

  const Delete = (_id) => {
    console.log(_id);
    setidconf(_id);
    setShow(true);
  };
  const confirm = () => {
    axios
      .delete(`http://localhost:2999/project/deletebook/${idconf}`)
      .then((res) => setreply(true));
    setShow(false);
    setTimeout(() => {
      window.location.reload(false);
    }, 2999);
  };
  // delete end

  // search start
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [head, sethead] = useState(false);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    const newFilteredData = booksD.filter(
      (item) =>
        item.bookname &&
        item.bookname.toLowerCase().includes(searchInput.toLowerCase())
    );
    sethead(true);
    setFilteredData(newFilteredData);
  };

  // search end

  return (
    <div className="scrollable books">
      <section className="align-items-center row">
        <Form className="d-flex col-md-6">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            value={searchInput}
            onChange={handleSearchInput}
            required
          />
          <Button
            // variant="outline-success"
            className="btn btn-info"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Form>
        {head ? (
            <div className="mt-4">
              <h2>Search Results</h2>

              <table className="table">
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Publication</th>
                    <th>Price</th>
                    <th>view</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                {filteredData.map((bs) => {
                  return (
                    <>
                      <tbody>
                        <tr key={bs._id}>
                          <td> {bs.bookname}</td>
                          <td> {bs.category}</td>
                          <td> {bs.author}</td>
                          <td> {bs.publication}</td>
                          <td> {bs.price}</td>

                          <td>
                            <Link to={`/view/${bs._id}`}>
                              <Button className="btn btn-success">
                               view
                              </Button>
                            </Link>
                          </td>

                          <td>
                            <Link to={`/edit/${bs._id}`}>
                              <Button className="btn btn-info">Edit</Button>
                            </Link>
                          </td>
                          <td>
                            <Button
                              className="btn-danger"
                              onClick={() => Delete(bs._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </div>
          ) : (
            <></>
          )}
        <div className="col-lg-12 col-md-12 col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Category</th>
                <th>Author</th>
                <th>Publication</th>
                <th>Price (₹)</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {booksD.map((lib) => {
              return (
                <>
                  <tbody>
                    <tr key={lib._id}>
                      <td> {lib.bookname}</td>
                      <td> {lib.category}</td>
                      <td> {lib.author}</td>
                      <td> {lib.publication}</td>
                      <td> ₹{lib.price}</td>
                      <td>
                        <Link to={`/view/${lib._id}`}>
                          <Button className="btn btn-success">
                            <AiFillEye />
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/edit/${lib._id}`}>
                          <Button className="btn ">
                            <AiFillEdit />
                          </Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          className="btn-danger"
                          onClick={() => Delete(lib._id)}
                        >
                          <AiFillDelete />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
          <Modal show={show} centered>
            <Modal.Body>
              <h5 className="text-dark">
                Are you certain you want to delete this book?, Press "Yes" to
                continue.
              </h5>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShow(false);
                }}
              >
                No
              </Button>
              <Button variant="primary" onClick={confirm}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={reply} centered>
            <Modal.Body className="bg-success text-white">
              <h6>Book successfully removed</h6>
            </Modal.Body>
          </Modal>
        </div>
      </section>
    </div>
  );
}

export default Books;
