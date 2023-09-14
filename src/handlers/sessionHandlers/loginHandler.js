const { loginController } = require("../../controllers/sessionControllers/loginController");

const loginHandler = async (req, res) => {
    try {
        const {email, password} = req.body
        console.log(email);
        if (!email || !password) return res.status(400).json({error: 'Missing required fields'})
        const userData = {
            email,
            password
        }
        const userValidate = await loginController(userData)

        if(!userValidate) return res.json({message: "error"})

        return res.status(200).json(userValidate)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    

};

module.exports = {
    loginHandler,
};