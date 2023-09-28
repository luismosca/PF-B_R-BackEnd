const nodemailer = require("nodemailer");

  const emailController = (userEmail) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "piero7210@gmail.com",
        pass: "xdqn umdb fgai hxny",
      },
    });

    let message = {
      from: "piero7210@gmail.com",
      to: userEmail,
      subject: "Confirmación de registro exitoso",
      text: "Bienvenido/a a Búsqueda y Rescate, la Web App donde somos agentes de cambio!",
      html: `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <style>
            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif;}
            h1{ font-size: 30px;}
            h2{ font-size: 25px;}
            h3{ font-size: 18px;}
            h4{ font-size: 16px;}
            p, a{font-size: 15px;}
    
            .claseBoton{
                width: 20%;
                    background-color: #c5f663;
                    border: 2px solid #5a09a7;
                    color: #06010e; 
                    padding: 16px 32px;
                    text-align: center;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    transition-duration: 0.4s;
                    cursor: pointer;
            }
            .claseBoton:hover{
                background-color: #fffcfc;
                color: #000000;
            }
            .imag{
                width: 20px;
                height: 20px;
            }
            .contA{
                margin: 0px 5px 0 5px;
            }
            .afooter{
                color: #ffffff !important; 
                text-decoration: none;
                font-size: 13x !important;
            }
        </style>
    </head>
    <body>
        <div style="width: 100%; background-color: #e3e3e3;">
            <div style="padding: 20px 10px 20px 10px;">
                <!-- Imagen inicial -->
                <div style="background-color: #c5f663; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                    <img src={logo} alt="" style="width: 200px; height: 60px;">
                </div>
                <!-- Imagen inicial -->
    
                <!-- Contenido principal -->
                <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                    <h1>Gracias por tu registro en ByR!</h1>
                    <p>Bienvenido/a a Búsqueda y Rescate, la Web App donde somos agentes de cambio!</p>
    
                    <!-- Gracias -->
                    <p>Muchas Gracias</p>
                    <p style="margin-bottom: 30px;"><i>Sinceramente:</i><br>El equipo de ByR</p>
    
                    <!-- Botón -->
                    <a class="claseBoton" style="margin-bottom: 40px" href="https://pf-b-r-front-end.vercel.app/">ByR Website</a>
                </div>
                <!-- Contenido principal -->
    
                <!-- Footer -->
                <div style="background-color: #c5f663; padding: 10px 0px 0px 0px; width: 100%; text-align: center;">    
                    <h4>Soporte</h4>
                    <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                        Contáctanos por los siguientes canales:<br>
                        Mail: <a class="afooter" href="nina.hansen@ethereal.email">nina.hansen@ethereal.email</a><br>
                    </p>
                    <p style="background-color: #06010e; color: #ffffff; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                        © 2023 ByR, Todos los derechos reservados.
                    </p>
                </div>           
            </div>
        </div>
    </body>
    </html>`,
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error occurred");
        console.log(error.message);
        return process.exit(1);
      }

      console.log("Message sent successfully!");
      console.log(nodemailer.getTestMessageUrl(info));
    });
  };


module.exports = { emailController };
