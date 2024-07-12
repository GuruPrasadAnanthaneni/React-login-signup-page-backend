const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/user_routes");
const app = express();

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://guru:guru@cluster0.oowiasj.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("Database connection error:", err));

const db = mongoose.connection;
db.on("error", err => {
  console.error("Database connection error:", err);
});

app.use(express.json());
app.use(cors());
app.use("/User-Data", routes);

const port = 5500;
app.listen(port, () => {
  console.log("Server Started on " + port);
});