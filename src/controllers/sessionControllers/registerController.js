const {User} = require("../../db")

const registerController = async (userData) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerController
};