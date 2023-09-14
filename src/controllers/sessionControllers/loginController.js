const bcrypt = require('bcrypt')
const { User } = require('../../db')

const loginController = async(userData) => {
    try {
        console.log(userData);
        const user = await User.findOne({
            where:{
                email: userData.email
        }})

        if(!user){
            throw Error('User not found')
        };
        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        if(!passwordMatch){
            throw Error('Wrong password')
        };
        return { message: 'Successful authentication', user: user };

    } catch (error) {
        throw error
    }
}
module.exports = {
    loginController
};