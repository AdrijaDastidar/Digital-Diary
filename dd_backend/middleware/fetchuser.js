const jwt = require("jsonwebtoken");
const JWT_SECRET = "adrija$$project";

//Get the user from jwt token and id to req obj
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ msg: "Authorization denied" });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Token is not valid" });
  }
};
module.exports = fetchuser;
