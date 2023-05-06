import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import book from "../images/book.jpg";

function View() {
  const { id } = useParams();

  const [display, setdisplay] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:2999/project/displaybooksparams/${id}`)
      .then((res) => setdisplay(res.data));
  }, [id, display]);
  return (
    <div className="view">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 col-sm-12 text-center">
          <img src={book} alt="" className="" style={{ width: "40%" }} />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 view">
          <h1>{display.bookname}</h1>
          <p>
            <span>Author:</span> {display.author}
          </p>
          <p>
            <span>Category:</span> {display.category}
          </p>
          <p>
            <span>Publications:</span> {display.publication}
          </p>
          <p>
            Description:
            <br />
            {display.description}
          </p>
          <h4>₹{display.price}</h4>
        </div>
      </div>
    </div>
  );
}

export default View;
