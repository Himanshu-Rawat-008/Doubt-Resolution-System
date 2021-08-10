const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting"));

db.once("open", function () {
  console.log("COnnected to Database");
});

module.exports = db;
