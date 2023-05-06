import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import book from "../images/book.jpg";
import axios from "axios";
import { displaybooksdata } from "../url";

function Home() {
  const [display, setdisplay] = useState([]);
  useEffect(() => {
    axios.get(displaybooksdata).then((res) => {
      setdisplay(res.data);
      console.log(res.data);
      const id = res.data._id;
      console.log(id);
    });
  }, []);
  return (
    <div className="row gy-4">
      {display.map((lib) => {
        return (
          <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 align-items-center">
            <Card>
              <Card.Img variant="top" src={book} className="w-100 p-3" />
              <Card.Body>
                <Card.Title>{lib.bookname}</Card.Title>
                <Card.Text>Cat: {lib.category}</Card.Text>
                <Card.Text>Author: {lib.author}</Card.Text>
                <Card.Text>Publication:{lib.publication}</Card.Text>
                <Card.Text>₹{lib.price}</Card.Text>
                {/* <Button className="bg-success">Add To Cart</Button> */}
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
