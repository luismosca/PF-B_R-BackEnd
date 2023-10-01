const { getAllUsersAdmin, updateUserAdmin } = require("../controllers/UsersControllerAdmin");

const getAllUsersAdminHandler = async (req, res) => {
    try {
        const users = await getAllUsersAdmin()
        if (users) {
            return res.status(201).json(users)
        }
        return res.status(404).send({message: "No pending user found"})
    } catch (error) {
        return res.status(500).send({message: "Error to find users"})
    }
};

const updateUsersAdminHandler = async (req, res) => {
    const id = req.params;
    const { role } = req.body;
    try {
        const user = await updateUserAdmin(id, role);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);    
    } catch (error) {
        return res.status(500).json({message: "Error to find users"});
    }
};

module.exports = {
    getAllUsersAdminHandler,
    updateUsersAdminHandler,
};