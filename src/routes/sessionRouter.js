const { Router } = require("express");
const sessionRouter = Router();

const {
  registerHandler,
} = require("../handlers/sessionHandlers/registerHandler.js");
const { loginHandler } = require("../handlers/sessionHandlers/loginHandler.js");

sessionRouter.post("/login", loginHandler); ///login
sessionRouter.get("/login", (req, res) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token no proporcionado en los encabezados" });
    }
    res.json({ message: "Token recibido correctamente", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
sessionRouter.post("/register", registerHandler); //register

module.exports = sessionRouter;
