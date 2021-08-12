module.exports.studentUser = async function (req, res, next) {
  if (req.student) return next();
  return res.status(403).json({ error: "Access Denied" });
};

module.exports.teacherUser = async function (req, res, next) {
  if (req.teacher) return next();
  return res.status(403).json({ error: "Access Denied" });
};

module.exports.assistantUser = async function (req, res, next) {
  if (req.assistant) return next();
  return res.status(403).json({ error: "Access Denied" });
};
