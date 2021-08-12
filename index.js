const express = require("express");
const env = require("dotenv");
env.config();
const PORT = process.env.PORT || 3000;

const app = express();
const db = require("./config/mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//every time server restart user sign out which means cookie temporarily stored
// we are storing cookie in mongo-store
const MongoStore = require("connect-mongo");

// to properly listen to 5000
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// mongostore is used to store session cookie in the db
// take session cookie and exncrypt it
app.use(
  session({
    name: "Hosting",
    secret: process.env.SESSION_COOKIE_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.DB_URL,
        autoRemove: "enabled",
      },
      function (err) {
        console.log(err || "connect db setup");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// use express router - middleware
app.use("/", require("./routes"));

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
