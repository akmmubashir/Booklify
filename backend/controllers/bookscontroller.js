const { Books } = require("../models/schema");

//Create Data Start

const addBook = async (req, res) => {
  const { bookname, author, publication, category, price, description } =
    req.body;

  const data = await Books.findOne({ bookname, bookname });

  if (data) {
    res.json({
      message: "Book already exists",
      isError: true,
    });
  } else {
    const newBook = await Books.create({
      bookname,
      author,
      category,
      publication,
      price,
      description,
    });
    res.json({
      Message: "Book Created",
      Details: newBook,
    });
  }
};
//Create Data End

//Update Data Start

const updateBook = async (req, res) => {
  const _id = req.params.id;
  const { bookname, author, publication, price, category, description } =
    req.body;

  await Books.findByIdAndUpdate(_id, {
    bookname,
    author,
    publication,
    category,
    description,
    price,
  });
  res.json("Book Updated");
};

//Update Data End

//Delete Data Start
const deleteBook = async (req, res) => {
  const _id = req.params.id;
  const deleteUser = await Books.findByIdAndDelete(_id);
  res.json("Book Deleted");
};
//Delete Data End

//Display Function Start

const displayBooks = async (req, res) => {
  const displayBook = await Books.find();
  res.json(displayBook);
};
// Display Function End

// Display with params Start

const displayBookParams = async (req, res) => {
  const _id = req.params.id;
  // console.log(_id, "params");
  const displayBookParam = await Books.findById(_id);
  // console.log(displayBookParam);
  res.json(displayBookParam);
};
// Display with params End

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  displayBooks,
  displayBookParams,
};
