const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
    name: { type: String },
    username: { type: String },
    role: { type: String },
    status: { type: String },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
});
const Project = mongoose.model("Admin", loginSchema);

const BookSchema = mongoose.Schema({
    // img: { type: String },
    bookname: { type: String },
    author: { type: String },
    category: { type: String },
    publication: { type: String },
    description: { type: String },
    price: { type: String },
});
const Books = mongoose.model("BooksList", BookSchema);

const TeamSchema = mongoose.Schema({
    email: { type: String },
    firmname: { type: String },
    firmaddress: { type: String },
    employeename: { type: String },
    employeeaddress: { type: String },
    phone: { type: String },
    alterphone: { type: String },
    description: { type: String },
    position: { type: String },
    password: { type: String },
});

const Team = mongoose.model("TeamList", TeamSchema);

const OrderSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    address: { type: String },
    pincode: { type: String },
    country: { type: String },
    phone: { type: String },
    alterphone: { type: String },
    product: { type: String },
    buymode: { type: String },
    delivery: { type: String },
});

const Order = mongoose.model("OrderList", OrderSchema);

module.exports = { Project, Books, Team, Order };