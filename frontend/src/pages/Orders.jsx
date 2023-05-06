import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { displayOrder } from "../url";
import { AiFillEye } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

function Orders() {
  const [ordersD, setordersD] = useState([]);
  const [show, setShow] = useState(false);
  const [reply, setreply] = useState(false);
  const [idconf, setidconf] = useState("");
  useEffect(() => {
    axios.get(displayOrder).then((res) => {
      setordersD(res.data);
    });
  }, []);

  const Delete = (_id) => {
    console.log(_id);
    setidconf(_id);
    setShow(true);
  };
  const confirm = () => {
    axios
      .delete(`http://localhost:2999/project/cancelorder/${idconf}`)
      .then((res) => setreply(true));
    setShow(false);
    setTimeout(() => {
      window.location.reload(false);
    }, 2999);
  };

  return (
    <div className="scrollable books">
      <section className="align-items-center row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Country</th>
                <th>Payment</th>
                <th>View</th>
                <th>Cancel Order</th>
              </tr>
            </thead>
            {ordersD.map((order) => {
              return (
                <>
                  <tbody>
                    <tr key={order._id}>
                      <td> {order.name}</td>
                      <td> {order.email}</td>
                      <td> {order.phone}</td>
                      <td> {order.product}</td>
                      <td> {order.country}</td>
                      <td> {order.buymode}</td>
                      <td>
                        <Link to={`/order-details/${order._id}`}>
                          <Button className="btn btn-success">
                            <AiFillEye />
                          </Button>
                        </Link>
                      </td>
                      {/* <td>
                        <Link to={`/edit/${order._id}`}>
                          <Button className="btn ">
                            <AiFillEdit />
                          </Button>
                        </Link>
                      </td> */}
                      <td>
                        <Button
                          className="btn-danger"
                          onClick={() => Delete(order._id)}
                        >
                          Cancel
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
                Are you certain you want to cancel this order?, Press "Yes" to
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
              <h6>Product cancelled</h6>
            </Modal.Body>
          </Modal>
        </div>
        {/* <div className="col-lg-6 col-md-12 col-sm-12 text-center">
          <img src={books} alt="about" className="w-75" />
        </div> */}
      </section>
    </div>
  );
}

export default Orders;
