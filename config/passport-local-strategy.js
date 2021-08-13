const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Assistant = require("../models/assistant");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        let student = await Student.findOne({ email: email });
        let assistant = await Assistant.findOne({ email: email });
        let teacher = await Teacher.findOne({ email: email });
        if (student != null) {
          if (student.password == password) return done(null, student);
        }
        if (assistant != null) {
          if (assistant.password == password) return done(null, assistant);
        }
        if (teacher != null) {
          if (teacher.password == password) return done(null, teacher);
        }

        return done(null, false);
      } catch (err) {
        return res.status(400).json({ err: "error" });
      }
    }
  )
);

// Serialize user function
// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
// Deserialize user function
// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    let student = await Student.findById({ id }).select("-password");
    if (student != null) {
      return done(null, student);
    }

    let teacher = await Teacher.findById({ id }).select("-password");
    if (teacher != null) {
      return done(null, teacher);
    }

    let assistant = await Assistant.findById({ id }).select("-password");
    if (assistant != null) {
      return done(null, assistant);
    }
  } catch (err) {
    return done(null, err);
  }
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in then pass on the req to the next fucntion
  console.log(req.session);
  if (req.isAuthenticated()) return next();
  return res.status(404).json({ error: "Not Signed In" });
};

module.exports = passport;
