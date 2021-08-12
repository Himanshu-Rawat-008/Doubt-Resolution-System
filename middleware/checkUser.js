module.exports.studentUser = async function (req, res, next) {
  console.log("User " + req.user);
  console.log("User " + req.session.user);
  if (req.user.type == "S") return next();
  return res.status(403).json({ error: "Access Denied" });
};

module.exports.teacherUser = async function (req, res, next) {
  if (req.user.type == "T") return next();
  return res.status(403).json({ error: "Access Denied" });
};

module.exports.assistantUser = async function (req, res, next) {
  if (req.user.type == "TA") return next();
  return res.status(403).json({ error: "Access Denied" });
};
