const {User} = require("../../db")

const registerController = async (data) => {
    try {
        const newUser = User.create(data);
        return newUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerController
};