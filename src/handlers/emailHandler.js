
const {EmailControllerDonations} = require  ("../controllers/EmailControllerDonations")

const emailHandler = (req, res)=>{
    try {
        
        const {userEmail} = req.body
        const correo = EmailControllerDonations(userEmail)        
        res.status(200).send(correo)

    } catch (error) {
        res.status(400).json({error: error.message})
        // console.log(error.message);
    }
}

module.exports = {
    emailHandler
}