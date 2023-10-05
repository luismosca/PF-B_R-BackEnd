const jwt = require("jsonwebtoken")
const { User } = require("../db");
// Esta función está cread para la restriccion a las rutas del admin, de tal forma que no se pueda acceder a 
// tales rutas  a menos que la propiedad role del modelo user, cumpla con esta condición. :) TT Att Wil
const verifyIsAdmin = async (req, res, next) => {
    // Verifica si el usuario está logeado
    try {
        let authorization = req.headers.authorization;
    let token = "";
    let bearerHeader = [];
    console.log(authorization);
    if (authorization) {
        bearerHeader = authorization.split(" ");
    }
    if (bearerHeader.length > 1) {
        token = bearerHeader[1];
    }
    if (token === "") {
        return res.status(403).json({message: "No tienes permisos de "});
    }
   let decode = jwt.verify(token, "secret");
    if (decode) {
        console.log(decode);
        let user = await User.findOne({
            where: {
                email: decode.email,
            },
            attributes: ["role"]
        });
        console.log("USER::::::::::::::",user.toJSON());
        
        // Verifica si el usuario tiene el rol de administrador
        if (user && user.role === "admin") {
            next();
            return
        }
        // Si el usuario es un administrador, permite el acceso
    }
    return res.status(403).json({message: "No tienes permisos de administrador"});
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: "No tienes permisos de administrador"});
    }
    
        
    
}
        
    

module.exports = verifyIsAdmin;