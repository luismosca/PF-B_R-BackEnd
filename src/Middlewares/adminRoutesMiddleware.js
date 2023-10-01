const jwt = require("jsonwebtoken")
const { User } = require("../db");
// Esta función está cread para la restriccion a las rutas del admin, de tal forma que no se pueda acceder a 
// tales rutas  a menos que la propiedad role del modelo user, cumpla con esta condición. :) TT Att Wil
const verifyIsAdmin = async (req, res, next) => {
    // Verifica si el usuario está logeado
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "secret");

    const user = await User.findByPk(decode.id);

    // Verifica si el usuario tiene el rol de administrador
    if (user.role !== "admin") {
        return res.status(403).json({message: "No tienes permisos de administrador"});
    }
    // Si el usuario es un administrador, permite el acceso
    next();
    
}

module.exports = verifyIsAdmin;