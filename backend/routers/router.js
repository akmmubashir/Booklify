const express = require("express");
const {
    addBook,
    deleteBook,
    updateBook,
    displayBooks,
    displayBookParams,

} = require("../controllers/bookscontroller");
const { signup, login, admins } = require("../controllers/controller");
const { PlaceOrder, CancelOrder, DisplayOrder, DisplayOrderParams } = require("../controllers/ordercontroller");
const { signupteam, loginteam, teamslist } = require("../controllers/teamcontroller");

const routerindex = express.Router();
// routerindex.route("/home").get(protect, home);
// routerindex.route("/home").get(home);
routerindex.route("/signup").post(signup);
routerindex.route("/login").post(login);
routerindex.route("/admins").get(admins);
routerindex.route("/teamsignup").post(signupteam);
routerindex.route("/teamlogin").post(loginteam);
routerindex.route("/teamslist").get(teamslist);
routerindex.route("/addbook").post(addBook);
routerindex.route("/deletebook/:id").delete(deleteBook);
routerindex.route("/updatebook/:id").put(updateBook);
routerindex.route("/displaybooks").get(displayBooks);
routerindex.route("/displaybooksparams/:id").get(displayBookParams);
routerindex.route("/placeorder").post(PlaceOrder);
routerindex.route("/cancelorder/:id").delete(CancelOrder);
routerindex.route("/displayorder").get(DisplayOrder);
routerindex.route("/displayorderparams/:id").get(DisplayOrderParams);


module.exports = routerindex;