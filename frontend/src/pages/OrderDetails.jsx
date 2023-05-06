import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import book from "../images/book.jpg";

function OrderDetails() {
  const { id } = useParams();

  const [display, setdisplay] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:2999/project/displayorderparams/${id}`)
      .then((res) => setdisplay(res.data));
  }, [id, display]);
  return (
    <div className="view">
      <h1 className="fw-bolder fs-1 text-center mb-5">Order Details</h1>

      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 col-sm-12 text-center">
          <img src={book} alt="" className="" style={{ width: "40%" }} />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 view">
          <h1>{display.product}</h1>
          <p>
            <span>Name:</span> {display.name}
          </p>
          <p>
            <span>Email:</span> {display.email}
          </p>
          <p>
            <span>Phone:</span> {display.phone}
          </p>
          <p>
            <span>Alternative Phone:</span> {display.alterphone}
          </p>
          <p>
            <span>Delivery Type:</span> {display.delivery}
          </p>
          <p>
            <span>Address:</span> {display.address}
          </p>
          <p>
            <span>Country:</span> {display.country}
          </p>
          <p>
            <span>Pincode:</span> {display.pincode}
          </p>
          <p>
            <span> Payment Mode: </span>
            {display.buymode}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
