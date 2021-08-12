const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Assistant = require("../models/assistant");

const brcypt = require("brcypt");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      // email defined in models
      usernameField: "email",
    },
    async function (email, password, done) {
      // find the user and establish the identity
      try {
        let student = await Student.findOne({ email: email });
        if (student) {
          if (bcrypt.compareSync(password, student.password)) {
            return done(null, student);
          }
        }
        let teacher = await Teacher.findOne({ email: email });
        if (teacher) {
          if (bcrypt.compareSync(password, teacher.password)) {
            return done(null, teacher);
          }
        }
        let assistant = await Assistant.findOne({ email: email });
        if (assistant) {
          if (bcrypt.compareSync(password, assistant.password)) {
            return done(null, assistant);
          }
        }
        return done(null, false);
      } catch (e) {
        return done(e);
      }
    }
  )
);

// Serialize user function
// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// Deserialize user function
// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  let student = await Student.findById({ id });
  if (student) return done(null, student);

  let teacher = await Teacher.findById({ id });
  if (teacher) return done(null, teacher);

  let assistant = await Assistant.findById({ id });
  if (assistant) return done(null, assistant);

  return done(null);
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in then pass on the req to the next fucntion
  if (req.isAuthenticated()) return next();
  return res.status(404).json({ error: "Not Signed In" });
};

passport.blockAccess = function (req, res, next) {
  if (req.isAuthenticated())
    return res.status(403).json({ error: "Access Denied" });
  next();
};
module.exports = passport;
