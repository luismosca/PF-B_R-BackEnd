const jwt = require('jsonwebtoken');
const { User } = require("../../db.js");

const postTokenHandler = async (req, res) => {
    // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "no autorizado" });
    }
    const tokenData = jwt.verify(token, "secret");
    if (tokenData && tokenData.email) {
      // TODO
      us = await User.findOne({ where: { email: tokenData.email } });
      if (us) {
        return res.json({ message: "Token recibido correctamente", user: {
          id: us.id,
          name: us.name_surName,
          email: us.email,
          image: us.image,
          role: us.role,
          token: token
        } });
      }
    }
    return res.status(401).json({ message: "no autorizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    postTokenHandler,
};