const jwt = require("jsonwebtoken");

//Authorization Bearer <token>
const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization
  let bearerHeader = [];
  if (authorization) {
    bearerHeader = req.headers.authorization.split(" ");
  }
  let bearerToken = "";
  try {
    
    if (bearerHeader.length > 1) {
       bearerToken = bearerHeader[1];
    }
    if (bearerToken === "") {
      return res.status(403).json({message: "Token expirado"});
    }
    const payload = jwt.verify(bearerToken, "secret");
      

    if (!payload) {
      return res.status(401).send({ message: "Token expirado" });
    } 
    next();
  } catch (error) {
    res.status(401).send({error: error.message});
  }
};

module.exports = {verifyToken};
