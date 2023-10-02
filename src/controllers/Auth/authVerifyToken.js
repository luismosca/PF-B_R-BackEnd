const jwt = require("jsonwebtoken");

//Authorization Bearer <token>
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  try {
    const bearerToken = bearerHeader.split(" ")[1];
    const payload = jwt.verify(bearerToken, "secret");

    if (Date.now() > payload) {
      return res.status(401).send({ message: "Token expirado" });
    } 
    next();
  } catch (error) {
    res.status(401).send({error: error.message});
  }
};

module.exports = {verifyToken};
