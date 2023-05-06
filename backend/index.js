const express = require("express");
const routes = require("./routers/router");

const app = express();
const connectDB = require("./config/database");
const cors = require("cors");
connectDB();
console.log("hai");
app.use(express.json());
app.use(cors());
app.use("/project", routes);

app.get("/", (req, res) => {
  res.send("Running Successfully");
});

app.listen(2999, () => console.log("server is running"));
