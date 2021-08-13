module.exports.checkUser = async function (req, res, next) {
  if (req.isAuthenticated())
    return res.status(400).json({ Error: "What are you trying" });
  next();
};
