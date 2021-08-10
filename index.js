const express = require("express");
const env = require("dotenv");
env.config();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

const db = require("./config/mongoose");
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

// use express router - middleware
// app.use("/", require("./routes"));

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
